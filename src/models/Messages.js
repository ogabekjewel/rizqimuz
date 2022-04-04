const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
    message_id: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
})

const messages = mongoose.model("messages", MessageSchema)

module.exports = messages