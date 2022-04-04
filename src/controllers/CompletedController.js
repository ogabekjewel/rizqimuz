const boards = require("../models/Boards")
const users = require("../models/UserModel")
const { checkToken } = require("../modules/jwt")

module.exports = class Completed {
    static async CompletedGET(req, res) {
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

            const completedList = await boards.find({
                finished: true,
            }).skip(p_page * (c_page - 1)).limit(p_page)
            const completedCount = Math.ceil((await (await boards.find()).length)/16)

            res.render("completed", {
                title: "Tugallangan loyihalar | Rizqim",
                path: "/completed",
                user,
                boards: completedList,
                boards_count: completedCount,
                c_page,
            })
        } catch(e) {
            console.log(e)
            res.redirect("/404")
        }        
    }
}