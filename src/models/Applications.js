const mongoose = require("mongoose")

const ApplicationSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    board:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    github: {
        type: String,
        required: true,
    }, 
    phone: {
        type: String,
        required: true,
    },
    portfolio: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
})

const applications = mongoose.model("applications", ApplicationSchema)

module.exports = applications