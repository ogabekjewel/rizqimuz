const { FreelancersGET } = require("../controllers/FreelancersController")

const router = require("express").Router()

router.get("/", FreelancersGET)

module.exports = {
    path: "/freelancers",   
    router,   
}