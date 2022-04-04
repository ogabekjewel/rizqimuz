const boards = require("../models/Boards")
const sponsors = require("../models/Sponsors")
const users = require("../models/UserModel")
const { checkToken } = require("../modules/jwt")

module.exports = class HomeController {
    static async homeGET(req, res) {
        try {
            let { token } = req.cookies

            token = await checkToken(token)
    
            const { email } = token
    
            const user = await users.findOne({
                email,
            })
    
            const topBoards = await boards.find({
                top: true,
            })

            const topFreelancers = await users.find({
                top: true,
            })
            
            const finishBoards = await boards.find({
                finished: true,
            })

            const sponsorList = await sponsors.find()

            const freelancerList = await users.find()

            const boardList = await boards.find()

            res.render("index", {
                title: "Home || Rizqimuz",
                path: "/",
                user,
                top_boards: topBoards,
                top_freelancers: topFreelancers,
                finish_boards: finishBoards,
                sponsors: sponsorList,
                freelancers: freelancerList,
                boards: boardList,
            })
        } catch(e) {
            console.log(e)
            res.redirect("/404")
        }
    }

    static async projectInfoGET(req, res) {
        try {
            let { token } = req.cookies

            token = await checkToken(token)
    
            const { email } = token
    
            const user = await users.findOne({
                email,
            })

            res.render("project-info", {
                title: "",
                user,
            })
        } catch(e) {
            console.log(e)
        }
    }      
}         