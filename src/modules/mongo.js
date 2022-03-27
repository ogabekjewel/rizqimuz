const mongoose = require("mongoose")
const { MONGO_URL } = require("../../config")

require("../models/UserLanguages")
require("../models/UserModel")
require("../models/UserPostfolio")
require("../models/UserSkills")
require("../models/UserSocialNetworks")
require("../models/UserStudy")
require("../models/UserWorkPlace")   

module.exports = async function mongo() {
    try {
        await mongoose.connect(MONGO_URL)
        console.log("MONGO CONNECTED")
    } catch(e) {
        console.log("MONGO CONNECT FAILED" + e)
    }
}