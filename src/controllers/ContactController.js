const { v4 } = require("uuid")
const messages = require("../models/Messages")
const users = require("../models/UserModel")
const { checkToken } = require("../modules/jwt")
const ContactPOSTValidation = require("../validations/ContactPOSTValidation")

module.exports = class Contact {
    static async ContactGET(req, res) {
        try {
            let { token } = req.cookies

            token = await checkToken(token)
    
            const { email } = token
    
            const user = await users.findOne({
                email,
            })         
            
            res.render("contact", {
                title: "Aloqa || Rizqimuz",
                path: "/contact",
                user,   
                succes: null,
            })            
        } catch(e) {
            console.log(e)
            res.redirect("/404")
        }
    }

    static async ContactPOST(req, res) {
        try {
            let { token } = req.cookies

            token = await checkToken(token)
    
            const { email } = token
    
            const user = await users.findOne({
                email,
            })    
            
            let { name, phone, comment } = await ContactPOSTValidation(req.body)

            let message = await messages.create({
                message_id: v4(),
                name,
                phone,
                comment,
            })    

            res.render("contact", {
                title: "Aloqa || Rizqimuz",
                path: "/contact",
                user,   
                succes: "Xabaringiz muvofaqqiyatli yuborildi",
            })
        } catch(e) {
            console.log(e)
        }
    }
}