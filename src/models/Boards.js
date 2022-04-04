const mongoose = require("mongoose")

const BoardSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    budjet: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    applications: {
        type: Number,
        default: 0,
    },
    top: {
        type: Boolean,
        default: false,
    },
    date: {
        type: String,
    },
    finished: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
})

const boards = mongoose.model("boards", BoardSchema)

module.exports = boards