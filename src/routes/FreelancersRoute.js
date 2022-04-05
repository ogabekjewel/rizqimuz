const { FreelancersGET, FreelancerGET } = require("../controllers/FreelancersController")

const router = require("express").Router()

router.get("/", FreelancersGET)
router.get("/:slug", FreelancerGET)

module.exports = {
    path: "/freelancers",   
    router,   
}