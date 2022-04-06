const Joi = require("joi")

module.exports = function(data) {
    return Joi.object({
        id: Joi.string(),
        job_place: Joi.string().required(),
        job_name: Joi.string().required(),
        start_year: Joi.string().required(),
        start_month: Joi.string().required(),
        end_year: Joi.string().required(),
        end_month: Joi.string().required(),
        about: Joi.string().required(),
    }).validateAsync(data)
}