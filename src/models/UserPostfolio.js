const mongoose = require("mongoose")

const PortfolioSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true, 
    },       
    user_id: {
        type: String,
        required: true,   
    },
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    }
}) 

const portfolios = mongoose.model("portfolios", PortfolioSchema)

module.exports = portfolios