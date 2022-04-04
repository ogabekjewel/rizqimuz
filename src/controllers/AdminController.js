const slugify = require("slugify")
const Path = require("path") 
const { v4 } = require("uuid")
const founders = require("../models/Founders")
const messages = require("../models/Messages")
const technologies = require("../models/Technologies")
const users = require("../models/UserModel")
const FounderPOSTValidation = require("../validations/FounderPOSTValidation")
const boardPOSTValidation = require("../validations/boardPOSTValidation")
const boards = require("../models/Boards")    
const works = require("../models/UserJobs")
const portfolios = require("../models/UserPostfolio")
const languages = require("../models/UserLanguages")
const education = require("../models/UserStudy")
const sponsors = require("../models/Sponsors")
const { func } = require("joi")
const descriptions = require("../models/Description")
const applications = require("../models/Applications")

module.exports = class AdminController {
    static async AdminGET(req, res) {
        try {
            let { email } = req.admin
        
            let user = await users.findOne({
                email,
            })
    
            let pendingUsers = await users.find({
                status: "pending",
            })
            
            let technologyList = await technologies.find()
            let messageList = await messages.find()
            let userList = await users.find()
            let usersNumber = userList.length
            res.render("admin-index", {
                technologies: technologyList,
                user,
                messages: messageList,
                pending_user: pendingUsers,
                usersNumber,
            })            
        } catch(e) {
            console.log(e)
            res.redirect("/404")
        }
    }   
    
    static async TechnologyPOST(req, res) {
        let { technology_name } = req.body

        await technologies.create({
            technology_id: v4(),
            name: technology_name,
        })

        res.redirect("/admin")    
    }

    static async TechnologyDELETE(req, res) {
        let {name} = req.body
        
        name = await slugify(`${name}`, {
            replacement: (''),
        })

        await technologies.deleteOne({
            name,
        })

        res.status(200).json({
            ok: true,
        })
    }

    static async MessagesGET(req, res) {
        try {
            const { user_id } = req.admin
            const user = await users.findOne({
                user_id,
            })
            const messageList = await messages.find()
            const applicationList = await applications.find()
            
            res.render("admin-messages", {
                user,
                messages: messageList,
                applications: applicationList,
            })
        } catch(e) {     
            console.log(e)    
        }
    }

    static async MessageDELETE(req, res) {
        try {
            let { message_id } = req.body

            message_id = slugify(message_id, {
                replacement: (''),
            })

            await messages.deleteOne({
                message_id: message_id,
            })
            res.status(200).json({
                ok: true,
            })
        } catch(e) {
            res.status(400).json({
                ok: false,
            })
        }
    }

    static async ApplicationDELETE(req, res) {
        try {
            let { id } = req.body

            id = slugify(id, {
                replacement: (''),
            })
            
            await applications.deleteOne({
                id,
            })
            res.status(200).json({
                ok: true,
            })
        } catch(e) {
            res.status(400).json({
                ok: false,
            })
        }
    }

    static async userPublicPATCH(req, res) {
        try {
            const { user_id } = req.body

            await users.findOneAndUpdate({
                user_id,
            }, {
                status: "public",
            })
    
            res.status(200).json({
                ok: true,
            })
        } catch(e) {
            res.status(400).josn({
                ok: false,
            })
        }
    }

    static async aboutGET(req, res) {
        try {
            let { user_id } = req.admin
            let user = await users.findOne({
                user_id,   
            })
    
            let messageList = await messages.find({
                user_id,
            })
    
            let founderList = await founders.find()
    
            res.render("admin-about", {
                messages: messageList,
                user,
                founders: founderList,
            })            
        } catch(e) {
            res.render("404", {
                title: "404 || Rizqimuz"
            })    
        }
    }

    static async aboutPOST(req, res) {
        try {
            let { description } = req.body
            if(description) {
                await descriptions.deleteMany()
                await descriptions.create({
                    id: v4(),
                    text: description,
                })
                res.redirect("/admin/about")
                return
            }

            let { first_name, last_name } = await FounderPOSTValidation(req.body)
            let { email } = req.admin
            let { image } = req.files

            let imageType = image.mimetype.split("/")[0]
            let imageFormat = image.mimetype.split("/")[1]
            let imageName = image.md5
    
            if(imageType === "image" || imageType === "vector") {
                let imagePath = Path.join(__dirname, "..", "public", "img", "founders", `${imageName}.${imageFormat}`)
    
                await image.mv(imagePath)
                let user =  await founders.create({
                    founder_id: v4(),
                    first_name,
                    last_name,
                    image: `${imageName}.${imageFormat}`,
                })
            } else {
                throw new Error("Image type 'image' or 'vector'") 
            }

            res.status(201).json({   
                ok: true,
            })
        } catch(e) {
            console.log(e)
            res.status(400).json({
                ok: false,
            })
        }


    }

    static async aboutDELETE(req, res) {
        try {
            let { founder_id } = req.body
            
            await founders.deleteOne({
                founder_id,
            })

            res.status(200).json({
                ok: true,
            })
        } catch(e) {
            console.log(e)
            res.status(400).json({
                ok: false,
            })
        }
    }

    static async boardsGET(req, res) {
        try {
            let { email } = req.admin
            let messageList = await messages.find()
            
            let user = await users.findOne({
                email,
            })
    
            res.render("admin-boards", {
                messages: messageList,
                user,
            })
        } catch(e) {
            res.status(400).json({
                ok: false,
            })
        }
    }

    static async boardPOST(req, res) {
        try {
            let { image } = req.files
            let { board_title, board_phone, board_budjet, board_description, board_type } = await boardPOSTValidation(req.body)
            let imageType = image.mimetype.split("/")[0]
            let imageFormat = image.mimetype.split("/")[1]
            let imageName = image.md5
    
            let board_slug = await slugify( board_title, {
                replacement: ('-'),
                lower: true,
                remove: /[*+~.()'"!:@]/g,
            })

            let board_slug_find = await boards.findOne({
                slug: board_slug,
            })
    
            if(board_slug_find) {
                let random = Math.floor(Math.random() * 10)   
                board_slug = `${board_slug}${random}`
            }

            if(imageType === "image" || imageType === "vector") {
                let imagePath = Path.join(__dirname, "..", "public", "img", "boards", `${imageName}.${imageFormat}`)
    
                await image.mv(imagePath)

                let date = new Date()
                let year = date.getFullYear()
                let day = date.getDay()
                let time = date.getHours()

                await boards.create({
                    id: v4(),
                    name: board_title,
                    description: board_description,
                    phone: board_phone,
                    budjet: board_budjet,
                    image: `/boards/${imageName}.${imageFormat}`,
                    type: board_type,
                    date: `${time}#${day}#${year}`,
                    slug: board_slug,
                })
            } else {
                throw new Error("Image type 'image' or 'vector'") 
            }        
            
            res.status(200).json({
                ok: true,    
            })
        } catch(e) {
            console.log(e)
            res.status(400).json({
                ok: false,
            })
        }
    }

    static async UsersGET(req, res) {
        try {   
            let { email } = req.admin
            let { c_page, p_page } = req.query
            
            c_page = c_page || 1  
            p_page = p_page || 10
    
            let userList = await users.find().skip(p_page * (c_page - 1)).limit(p_page)
            
            let user = await users.findOne({
                email,
            })
    
            let messageList = await messages.find()
    
    
            res.render("admin-users", {
                user,
                messages: messageList,
                users: userList,
                c_page,
                p_page,
            })            
        } catch(e) {
            console.log(e)
        }
    }

    static async UserTOP(req, res) {
        try {
            let { user_id } = req.body
            
            let user = await users.findOne({
                user_id,
            })

            if(!user.top) {
                await users.findOneAndUpdate({
                    user_id,
                }, {
                    top: true,
                })
            } else {
                await users.findOneAndUpdate({
                    user_id,
                }, {
                    top: false,
                })
            }

            res.status(200).json({
                ok: true,
            })
        } catch(e) {
            console.log(e)
            res.status(400).json({
                ok: false,
            })    
        }
    }

    static async UserDELETE(req, res) {
        try {
            let { user_id } = req.body

            let user = await users.findOne({
                user_id,
            })
    
            if(user.degree == "superadmin" || user.degree == "admin") {
                throw new Error("user degree superadmin")
            } else {
                await works.deleteMany({
                    user_id,
                })
    
                await portfolios.deleteMany({
                    user_id,
                })
    
                await languages.deleteMany({
                    user_id,
                })
    
                await education.deleteMany({
                    user_id,
                })
    
                await users.deleteOne({
                    user_id,
                })
            }   
            
            res.status(200).json({
                ok: true,
            })
        } catch(e) {
            res.status(400).json({
                ok: false
            })
        }
    }

    static async SponsorGET(req, res) {
        try {
            let { email } = req.admin
            let user = await users.findOne({
                email,
            })
            let messageList = await messages.find()
            let sponsorList = await sponsors.find()

            res.render("admin-sponsors", {
                user,
                messages: messageList,
                sponsors: sponsorList,
            })
        } catch(e) {
            console.log(e)
            res.redirect("/404")
        }
    }

    static async SponsorPOST(req, res) {
        try {
            let { image } = req.files
            let { link } = req.body
    
            let imageType = image.mimetype.split("/")[0]
            let imageFormat = image.mimetype.split("/")[1]
            let imageName = image.md5
    
            if(imageType === "image" || imageType === "vector") {
                let imagePath = Path.join(__dirname, "..", "public", "img", "sponsors", `${imageName}.${imageFormat}`)
    
                await image.mv(imagePath)
    
                await sponsors.create({
                    id: v4(),   
                    link,
                    image: `/sponsors/${imageName}.${imageFormat}`,
                })   
            } else {
                throw new Error("Image type 'image' or 'vector'") 
            }        
            
            res.status(200).json({
                ok: true,
            })       
        } catch(e) {
            console.log(e)
            res.status(400).json({
                ok: false,
            })
        }
    }

    static async SponsorDELETE(req, res) {
        try {
            let { id } = req.body   

            await sponsors.deleteOne({
                id,
            })
            
            res.status(200).json({
                ok: true,
            })
        } catch(e) {
            res.status(400).json({
                ok: false,
            })
        }        
    }
}