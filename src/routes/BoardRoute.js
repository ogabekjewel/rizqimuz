const { BoardsGET, BoardsFilter, BoardGET, BoardPOST } = require("../controllers/BoardsController")

const router = require("express").Router()

router.get("/", BoardsGET)
router.get("/:slug", BoardGET)
router.post("/:slug", BoardPOST)
module.exports = {
    path: "/boards",
    router,
}