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
    name: {
        type: String,
        required: true,
    },
    
}) 

const languages = mongoose.model("portfolis", LanguageSchema)

module.exports = languages