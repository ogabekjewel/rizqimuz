const { checkToken } = require("../modules/jwt")

module.exports = async function(req, res, next) {
    let token = req?.cookies?.token

    if(!token) {
        res.redirect("/signin")
        return      
    }
        
    token = await checkToken(token)

    req.user = token
    next()
}  