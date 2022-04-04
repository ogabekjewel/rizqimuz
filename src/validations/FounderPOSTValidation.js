const Joi = require("joi")

module.exports = function(data) {
    return Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
    }).validateAsync(data)
}