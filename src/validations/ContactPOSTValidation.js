const Joi = require("joi")

module.exports = function(data) {
    return Joi.object({
        name: Joi.string().required(),
        phone: Joi.string().required(),
        comment: Joi.string().required(),
    }).validateAsync(data)
}