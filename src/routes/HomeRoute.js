const { homeGET, projectInfoGET } = require("../controllers/HomeController")

const router = require("express").Router()

router.get("/", homeGET)
router.get("/info", projectInfoGET)
module.exports = {
    path: "/",
    router,
}