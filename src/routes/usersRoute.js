const { SignUpGET, SignUpPOST, CompletedGET, verifyGET, SignInGET, SignInPOST, ProfileGET, AvatarPATCH, ProfileSlugGET } = require("../controllers/UserController")
const AuthMiddleware = require("../middlewares/AuthMiddleware")

const router = require("express").Router()

router.get("/signup", SignUpGET)
router.post("/signup", SignUpPOST)
router.get("/verify/:user_id", verifyGET)
router.get("/signin", SignInGET)
router.post("/signin", SignInPOST)

router.get("/profile", AuthMiddleware, ProfileGET)
router.get("/profile/:slug", AuthMiddleware, ProfileSlugGET)
router.patch("/avatar", AuthMiddleware, AvatarPATCH)

module.exports = {
    path: "/",
    router
}