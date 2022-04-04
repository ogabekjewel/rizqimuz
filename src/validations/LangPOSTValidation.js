const Joi = require("joi")

module.exports = function(data) {
    return Joi.object({
        language: Joi.string().required(),
        degree: Joi.string().required(),
    }).validateAsync(data)
}