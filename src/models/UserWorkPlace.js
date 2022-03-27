const mongoose = require("mongoose")

const WorkSchema = mongoose.Schema({
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
    about: {
        type: String,
        required: true,
    }
}) 

const works = mongoose.model("works", WorkSchema)

module.exports = works