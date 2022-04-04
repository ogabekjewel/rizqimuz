const mongoose = require("mongoose")

const FounderSchema = new mongoose.Schema({
    founder_id: {
        type: String,
        unique: true,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    }
})

const founders = mongoose.model("founders", FounderSchema)

module.exports = founders