const { AdminGET, TechnologyPOST, TechnologyDELETE, MessagesGET, MessageDELETE, userPublicPATCH, aboutGET, aboutPOST, aboutDELETE, boardsGET, boardPOST, UsersGET, UserTOP, UserDELETE, SponsorGET, SponsorPOST, SponsorDELETE, ApplicationDELETE } = require("../controllers/AdminController")
const AdminMiddleware = require("../middlewares/AdminMiddleware")

const router = require("express").Router()

router.get("/", AdminMiddleware, AdminGET)
router.post("/technology", AdminMiddleware, TechnologyPOST)
router.delete("/technology", AdminMiddleware, TechnologyDELETE)

router.get("/messages", AdminMiddleware, MessagesGET)
router.delete("/messages", AdminMiddleware, MessageDELETE)
router.delete("/applications", AdminMiddleware, ApplicationDELETE)
router.patch("/public", AdminMiddleware, userPublicPATCH)
router.get("/about", AdminMiddleware, aboutGET)
router.post("/about", AdminMiddleware, aboutPOST)
router.delete("/about", AdminMiddleware, aboutDELETE)

router.get("/boards", AdminMiddleware, boardsGET)
router.post("/boards", AdminMiddleware, boardPOST)
   
router.get("/users", AdminMiddleware, UsersGET)
router.patch("/users", AdminMiddleware, UserTOP)
router.delete("/users", AdminMiddleware, UserDELETE)
router.get("/sponsors", AdminMiddleware, SponsorGET)
router.post("/sponsors", AdminMiddleware, SponsorPOST)
router.delete("/sponsors", AdminMiddleware, SponsorDELETE)

module.exports = {
    path: "/admin",
    router
}

