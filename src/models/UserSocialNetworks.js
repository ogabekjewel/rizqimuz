const mongoose = require("mongoose")

const SocialNetworkSchema = mongoose.Schema({
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
    icon: {
        type: String,
        required: true,
    }
}) 

const social_network = mongoose.model("social_network", SocialNetworkSchema)

module.exports = social_network