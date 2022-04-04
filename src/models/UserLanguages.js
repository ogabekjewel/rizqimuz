const mongoose = require("mongoose")

const LanguageSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    }
    
}) 

const languages = mongoose.model("languages", LanguageSchema)

module.exports = languages