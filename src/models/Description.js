const mongoose = require("mongoose")

const DescriptionSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
})

const descriptions = mongoose.model("descriptions", DescriptionSchema)

module.exports = descriptions