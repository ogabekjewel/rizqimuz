const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    user_id: {
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
    slug: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    pass: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    phone: {
        type: String,
    },
    telegram_username: {
        type: String,
    },
    description : {   
        type: String,
    },
    role: {   
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
        default: "user",
    },
    is_verified: {
        type: Boolean,
        required: true,
        default: false,
    }, 
    status: {
        type: String,
        default: "pending",
    },
    top: {
        type: Boolean,
        default: false,
    },
})

const users = mongoose.model("users", UserSchema)

module.exports = users