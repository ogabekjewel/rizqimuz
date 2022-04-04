const mongoose = require("mongoose")

const TechnologySchema = mongoose.Schema({
    technology_id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    
}) 

const technologies = mongoose.model("technologies", TechnologySchema)

module.exports = technologies