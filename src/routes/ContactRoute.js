const {  ContactGET, ContactPOST } = require("../controllers/ContactController")

const router = require("express").Router()

router.get("/", ContactGET)
router.post("/", ContactPOST)

module.exports = {
    path: "/contact",
    router,
}