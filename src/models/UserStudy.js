const mongoose = require("mongoose")

const StudySchema = mongoose.Schema({
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
    direction: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    start_year: {
        type: String,
        required: true,
    },
    start_month: {
        type: String,
        required: true,
    },
    end_year: {
        type: String,
        required: true,
    },
    end_month: {
        type: String,
        required: true,
    },
}) 

const education = mongoose.model("education", StudySchema)

module.exports = education