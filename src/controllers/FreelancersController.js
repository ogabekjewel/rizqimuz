const works = require("../models/UserJobs")
const languages = require("../models/UserLanguages")
const users = require("../models/UserModel")
const portfolios = require("../models/UserPostfolio")
const education = require("../models/UserStudy")
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

            let { c_page } = req.query
            
            c_page = c_page || 1
            let p_page = 12

            let freelancerList = await users.find().skip(p_page * (c_page - 1)).limit(p_page)
            let freelancersNumber = Math.ceil((await (await users.find()).length)/p_page)
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

    static async FreelancerGET(req, res) {
        try {
            const { slug } = req.params
        
            let { token } = req.cookies
    
            token = await checkToken(token)
    
            const { email } = token
    
            const user = await users.findOne({
                email,
            }) 
    
            const freelancer = await users.findOne({
                slug,
            })
            
            let portfolioList = await portfolios.find({
                user_id: freelancer.user_id,
            })

            let educationList = await education.find({
                user_id: freelancer.user_id,
            })

            let WorkList = await works.find({
                user_id: freelancer.user_id,
            })

            let langList = await languages.find({
                user_id: freelancer.user_id,
            })

            res.render("freelancer", {
                path: "/freelancers",
                title: `${freelancer.first_name} ${freelancer.last_name} | Rizqimuz`,
                user,  
                freelancer,  
                portfolios: portfolioList,
                education: educationList,
                works: WorkList,
                languages: langList,
            })
        } catch(e) {
            console.log(e) 

        }
    }
}       