const mongoose = require("mongoose")

const SkillSChema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    
}) 

const skills = mongoose.model("skills", SkillSChema)

module.exports = skills