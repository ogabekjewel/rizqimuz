const descriptions = require("../models/Description")
const founders = require("../models/Founders")
const users = require("../models/UserModel")
const { checkToken } = require("../modules/jwt")

module.exports = class AboutController {
    static async AboutGET(req, res) {
        try {
            let { token } = req.cookies

            token = await checkToken(token)
    
            const { email } = token
    
            const user = await users.findOne({
                email,
            }) 
            
            const description = await descriptions.find()
            
            const founderList = await founders.find()
            
            res.render("about", {
                title: "Biz haqimizda | Rizqim",
                path: "/about",
                user,
                founders: founderList,
                text: description[0].text,
            })
        } catch(e) {
            console.log(e)
            res.redirect("/404")
        }
    }
}   