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
    job_place: {
        type: String,
        required: true,
    },
    job_name: {
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

const works = mongoose.model("works", WorkSchema)

module.exports = works