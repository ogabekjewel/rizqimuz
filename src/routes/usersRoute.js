const { SignUpGET, SignUpPOST, CompletedGET, verifyGET, SignInGET, SignInPOST, ProfileGET, AvatarPATCH, ProfileSlugGET, ProfilePOST, PortfolioPOST, EducationPOST, JobPOST, LangPOST, SkillsPOST } = require("../controllers/UserController")
const AuthMiddleware = require("../middlewares/AuthMiddleware")

const router = require("express").Router()

router.get("/404", (req, res) => {
    res.render("404", {
        title: "404 || Rizqimuz"
    })
})

router.get("/signup", SignUpGET)
router.post("/signup", SignUpPOST)
router.get("/verify/:user_id", verifyGET)
router.get("/signin", SignInGET)      
router.post("/signin", SignInPOST)
    
router.get("/profile", AuthMiddleware, ProfileGET)
router.get("/profile/:slug", AuthMiddleware, ProfileSlugGET)
router.patch("/avatar", AuthMiddleware, AvatarPATCH)
router.post("/profile", AuthMiddleware, ProfilePOST)
router.post("/profile/portfolio", AuthMiddleware, PortfolioPOST)
router.post("/profile/education", AuthMiddleware, EducationPOST)
router.post("/profile/job", AuthMiddleware, JobPOST)
router.post("/profile/language", AuthMiddleware, LangPOST)

module.exports = {   
    path: "/",     
    router
}