const boards = require("../models/Boards")
const users = require("../models/UserModel")
const { checkToken } = require("../modules/jwt")
const { v4 } = require("uuid")
const applications = require("../models/Applications")

module.exports = class BoardsController {
    static async BoardsGET(req, res) {
        try {
            let { token } = req.cookies

            token = await checkToken(token)
    
            const { email } = token
    
            const user = await users.findOne({
                email,
            })

            let { c_page, p_page } = req.query
            
            c_page = c_page || 1
            p_page = 16

            const boardList = await boards.find({
                finished: false
            }).skip(p_page * (c_page - 1)).limit(p_page)
            const boardsCount = Math.ceil((await (await boards.find()).length)/16)

            res.render("boards", {
                title: "E'lonlar | Rizqim",
                path: "/boards",
                user,
                boards: boardList,
                boards_count: boardsCount,
                c_page,
            })
        } catch(e) {
            console.log(e)
            res.redirect("/404")
        }
    }
    
    static async BoardGET(req, res) {
        try {
            let { token } = req.cookies

            token = await checkToken(token)
    
            const { email } = token
    
            const user = await users.findOne({
                email,
            }) 

            const { slug } = req.params
    
            const board = await boards.findOne({
                slug,
            }) 

            if(user) {
                await boards.findOneAndUpdate({
                    slug,
                }, {
                    views: board.views + 1,
                })
            }

            res.render("project-info", {
                title: `${board.name} | Rizqim`,
                user,
                board,
                succes: null,
            })            
        } catch(e) {
            console.log(e)
            res.redirect("/404")
        }
    }

    static async BoardPOST(req, res) {
        try {
            const { slug } = req.params 
            const { full_name, phone, git, portfolio, comment } = req.body
            let { token } = req.cookies
    
            token = await checkToken(token)
    
            const { email } = token
    
            const user = await users.findOne({
                email,
            })

            if(!user) {
                res.redirect("/signin")
                return
            }

            const board = await boards.findOne({
                slug,
            })

            if(!board) {
                throw new Error("Board not found")
            }

            await applications.create({
                id: v4(),
                user_id: user.user_id,
                board: `/boards/${slug}`, 
                name: full_name,
                github: git,
                phone,
                portfolio,
                comment,
            })   
            
            await boards.findOneAndUpdate({
                id: board.id,
            }, {
                applications: board.applications + 1,
            })

            res.render("project-info", {
                title: `${board.name} | Rizqim`,
                user,
                board,
                succes: "Arizangiz muvaofaqqiyatli yuborildi",
            })  
        } catch(e) {
            console.log(e)
            res.redirect("/404")
        }
    }
}