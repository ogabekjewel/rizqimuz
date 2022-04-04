const { checkToken } = require("../modules/jwt")

module.exports = async function(req, res, next) {
    let { token } = req.cookies

    if(!token) {
        res.redirect("/signin")
        return
    }

    token = await checkToken(token)
    
    if(token.degree == "user") {
        res.redirect("/404")
        return
    }
    
    req.admin = token

    next()
}