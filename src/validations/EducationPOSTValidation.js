const Joi = require("joi")

module.exports = function(data) {
    return Joi.object({
        id: Joi.string(),
        education_name: Joi.string().required(),
        education_direction: Joi.string().required(),
        about: Joi.string().required(),
        start_year: Joi.number().required(),
        end_year: Joi.number().required(),
        start_month: Joi.string().required(),
        end_month: Joi.string().required(),
    }).validateAsync(data)
}