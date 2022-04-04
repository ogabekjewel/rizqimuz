const mongoose = require("mongoose")

const SponsorSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
})

const sponsors = mongoose.model("sponsors", SponsorSchema)

module.exports = sponsors