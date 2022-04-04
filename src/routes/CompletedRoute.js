const { CompletedGET } = require("../controllers/CompletedController")

const router = require("express").Router()

router.get("/", CompletedGET)

module.exports = {
    path: "/completed",
    router,
}