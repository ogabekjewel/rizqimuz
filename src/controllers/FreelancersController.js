const users = require("../models/UserModel")
const { checkToken } = require("../modules/jwt")

module.exports = class FreelancersController {
    static async FreelancersGET(req, res) {
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

            let freelancerList = await users.find().skip(p_page * (c_page - 1)).limit(p_page)
            let freelancersNumber = Math.ceil((await (await users.find()).length)/16)
            res.render("freelancers", {
                path: "/freelancers",
                title: "Freelancers || Rizqimuz",
                user,
                freelancers: freelancerList,
                c_page,
                freelancers_number: freelancersNumber,  
            })
        } catch(e) {
            console.log(e)
            res.redirect("/404")
        }
    }
}       