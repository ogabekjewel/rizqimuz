const { AboutGET } = require("../controllers/AboutController")
const { BoardsGET, BoardsFilter, BoardGET, BoardPOST } = require("../controllers/BoardsController")

const router = require("express").Router()

router.get("/", AboutGET)

module.exports = {
    path: "/about",
    router,
}