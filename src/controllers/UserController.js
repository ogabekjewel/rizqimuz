const SignUpValidation = require("../validations/SignUpValidation")
const slugify = require("slugify")
const Path = require("path")
const users = require("../models/UserModel")
const SendMail = require("../modules/email")
const { PORT } = require("../../config")
const { generateToken } = require("../modules/jwt")
const { generateHash } = require("../modules/bcrypt")
const { v4 } = require("uuid")
const SignInValidation = require("../validations/SignInValidation")
const { compareHash } = require("../modules/bcrypt")
const { checkToken } = require("../modules/jwt")
const portfolios = require("../models/UserPostfolio")
const EducationPOSTValidation = require("../validations/EducationPOSTValidation")
const education = require("../models/UserStudy")
const JobPOSTValidation = require("../validations/JobPOSTValidation")
const works = require("../models/UserJobs")
const languages = require("../models/UserLanguages")
const LangPOSTValidation = require("../validations/LangPOSTValidation")
const skills = require("../models/UserSkills")
const technologies = require("../models/Technologies")

module.exports = class User {
    static async SignUpGET(req, res) {
        try {
            let { token } = req.cookies

            token = await checkToken(token)
    
            const { email } = token
             
            const user = await users.findOne({
                email,
            })
    
            res.render("signup", {
                title: "Sign Up || Rizqimuz",
                user,
            })            
        } catch(e) {
            res.redirect("/404")
        }
    }

    static async SignUpPOST(req, res) {
        try {
            let { first_name, last_name, email, password, role } = await SignUpValidation(req.body)

            let user = await users.findOne({
                email,
            })
    
            if(user) {
                res.redirect("/signin")
                return
            }
    
            let slug = await slugify(`${first_name} + ${last_name}`, {
                replacement: (''),
                lower: true,
                remove: /[*+~.()'"!:@]/g,
            })
    
            async function find() {
                let slugFind = await users.findOne({
                    slug,
                }) 

                if(slugFind) {
                    let random = Math.ceil(Math.random() * 10)
                    slug = `${slug}${random}`
                    
                    await find()
                }
            }
    
            await find()

            let pass = await generateHash(password)
    
            user = await users.create({
                user_id: v4(),
                first_name,
                last_name,
                slug, 
                email, 
                pass,
                role,
                avatar: `/users/default.jpg`,
            })
    
            let token = await generateToken({
                ...user._doc,
                pass: undefined,
            })
    
            await SendMail(
                email, 
                `Verification link`, 
                "Email verification", 
                `<p><a href="http://localhost:${PORT}/verify/${user.user_id}">Click here</a> to activate you account</p>`
            )
    
            res.cookie("token", token).redirect("/profile")    
        } catch(e) {
            console.log(e)
            res.render("signup", {
                ok: false,
                title: "Sign Up",
                message: e + "",
            })
        }            
    }

    static async verifyGET(req, res) {
        try {
            let { user_id } = req.params
        
            let user = await users.findOneAndUpdate({
                user_id,
            }, {
                is_verified: true,
            })
    
            res.redirect("/profile")            
        } catch(e) {
            console.log(e)
            res.redirect("/404")
        }
    }

    static async SignInGET(req, res) {
        try {
            let { token } = req.cookies

            token = await checkToken(token)
    
            const { email } = token
             
            const user = await users.findOne({
                email,
            })
    
            res.render("signin", {
                title: "Sign in || Rizqimuz",
                user,
            })
        } catch(e) {
            res.redirect("/404")
        }
    }

    static async SignInPOST(req, res) {
        try {
            let { email, password } = await SignInValidation(req.body)

            let user = await users.findOne({
                email,
            })
            
            if(!email) {
                res.redirect("/signup")
                return
            }
    
            let isPasswordTrue = await compareHash(password, user.pass)
            
            if(!isPasswordTrue) {
                throw new Error("Parolingiz xato qayta urinib ko'ring")
            }
    
            let token = await generateToken({
                ...user._doc,
                pass: undefined,
            })   
    
            res.cookie("token", token).redirect("/profile")            
        } catch(e) {
            console.log(e)
            res.render("signin", {
                message: e + "",
                title: "Sign In || Rizqimuz"
            })
        }
    }

    static async ProfileGET(req, res) {
        try {
            let { token } = req.cookies

            if(!token) {
                res.redirect("/signin")
                return
            }
            
            token = await checkToken(token)
            
            let { email } = token
    
            let user = await users.findOne({
                email,
            })

            res.redirect(`profile/${user.slug}`)
        } catch(e) {
            console.log(e)
            res.render("404", {
                ok: false,
                message: e + "",
                title: "404",
            })
        }
    }

    static async ProfileSlugGET(req, res) {
        try {
            let { slug } = req.params

            let user = await users.findOne({
                slug,
            })

            // if(user.is_verified == false) throw new Error("Emailingizni tasdiqlang")
            
            let portfolioList = await portfolios.find({
                user_id: user.user_id,
            })

            let educationList = await education.find({
                user_id: user.user_id,
            })

            let WorkList = await works.find({
                user_id: user.user_id,
            })

            let langList = await languages.find({
                user_id: user.user_id,
            })

            let all_technology = await technologies.find()
                    
            res.render("profile", {
                title: `${user.first_name} ${user.last_name} || Rizqimuz`,
                user,
                portfolios: portfolioList,
                education: educationList,
                works: WorkList,
                languages: langList,
                all_technology,
            })            
        } catch(e) {      
            res.render("404", {    
                title: `|| 404`,
                message: e + "",
            }) 
        }
    }

    static async AvatarPATCH(req, res) {   
        try {
            let { photo } = req.files

            let { token } = req.cookies

            token = await checkToken(token)
            let { email } = token
            let imageType = photo.mimetype.split("/")[0]
            let imageFormat = photo.mimetype.split("/")[1]
            let imageName = photo.md5
    
            if(imageType === "image" || imageType === "vector") {
                let imagePath = Path.join(__dirname, "..", "public", "img", "users", `${imageName}.${imageFormat}`)
    
                await photo.mv(imagePath)
                let user =  await users.findOneAndUpdate({
                    email,
                }, {
                    avatar: `/users/${imageName}.${imageFormat}`,
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
                message: e + "",
            }) 
        }
    }

    static async ProfilePOST(req, res) {
        let { first_name, last_name, phone, email, telegram_username, description } = req.body

        let user = req.user
          
        if(email) {    
            await SendMail(       
                email, 
                `Verification link`, 
                "Email verification", 
                `<p><a href="http://localhost:${PORT}/verify/${user.user_id}">Click here</a> to activate you account</p>`
            )

            res.redirect("/404")   
            return
        }

        await users.findOneAndUpdate({
            user,
        }, {
            first_name,
            last_name,
            phone,
            email,
            telegram_username,
            description,
        })

        res.redirect("/profile")
    }

    static async PortfolioPOST(req, res) {
        try {
            let { project_name, project_link, id } = req.body

            if(!project_name && !project_link) {
                await portfolios.findOneAndDelete({
                    id
                })
                res.redirect("/profile")
                return
            }

            let { portfolio_img } = req.files
            
            let user = req.user   
    
            let imageType = portfolio_img.mimetype.split("/")[0]
            let imageFormat = portfolio_img.mimetype.split("/")[1]
            let imageName = portfolio_img.md5
    
            if(imageType === "image" || imageType === "vector") {
                let imagePath = Path.join(__dirname, "..", "public", "img", "posting-images", `${imageName}.${imageFormat}`)
    
                await portfolio_img.mv(imagePath)
                
            } else {
                throw new Error("Image type 'image' or 'vector'") 
            }

            if(id) {
                await portfolios.findOneAndUpdate({
                    id,
                }, {
                    user_id: user.user_id,
                    name: project_name,
                    link: project_link, 
                    image: `/posting-images/${imageName}.${imageFormat}`,
                })
            } else {
                await portfolios.create({
                    id: v4(),
                    user_id: user.user_id,
                    name: project_name,
                    link: project_link, 
                    image: `/posting-images/${imageName}.${imageFormat}`,
                }) 
            }
            
            res.redirect("/profile")
        } catch(e) {
            console.log(e)
            res.status(400).json({
                ok: false,
            })
        }

    }
    
    static async EducationPOST(req, res) {
        try {
            let { education_name, education_direction, about, start_year, start_month, end_year, end_month, id } = await EducationPOSTValidation(req.body)
            
            let edu = await education.findOne({
                id
            })

            if(edu) {
                id = await slugify(id, {
                    replacement: (''),
                })

                let edu = await education.findOneAndUpdate({
                    id,
                }, {
                    name: education_name,   
                    direction: education_direction,
                    about,
                    start_year,
                    start_month,
                    end_year,
                    end_month
                })
                
                res.status(200).json({
                    ok: true,
                })

                return
            }

            const user = req.user
            
            await education.create({
                id: v4(),   
                user_id: user.user_id,  
                name: education_name,   
                direction: education_direction,
                about,
                start_year,
                start_month,
                end_year,
                end_month
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

    static async JobPOST(req, res) {
        try {
            let { job_place, job_name, start_year, start_month, end_year, end_month, about, id } = await JobPOSTValidation(req.body)
            
            let work = await works.findOne({
                id,
            })

            if(work) {
                id = await slugify(id, {
                    replacement: (''),
                })

                let work = await works.findOneAndUpdate({
                    id,
                }, {
                    job_place, 
                    job_name, 
                    about, 
                    start_year, 
                    end_year, 
                    start_month,   
                    end_month,
                })

                res.status(200).json({
                    ok: true,
                })

                return
            }
            const user = req.user
    
            await works.create({
                id: v4(),   
                user_id: user.user_id,
                job_place, 
                job_name, 
                about, 
                start_year, 
                end_year, 
                start_month, 
                end_month,
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

    static async LangPOST(req, res) {
       try {
            let { language, degree, id } = await LangPOSTValidation(req.body)
            
            if(id) {
                id = await slugify(id, {
                    replacement: (''),
                })
                
                await languages.findOneAndUpdate({
                    id,
                }, {
                    language,
                    degree,
                })

                res.status(200).json({
                    ok: true,
                })

                return
            }

            const user = req.user

            await languages.create({
                id: v4(),
                user_id: user.user_id,
                language,
                degree,
            })

            res.status(200).json({
                ok: true,
            })                   
       } catch(e) {
           console.log(e)
           res.status(400).json({
               ok: false
           })
       }
    }
}