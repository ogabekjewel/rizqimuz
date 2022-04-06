const Joi = require("joi")

module.exports = function(data) {
    return Joi.object({
        id: Joi.string(),
        language: Joi.string().required(),
        degree: Joi.string().required(),
    }).validateAsync(data)
}