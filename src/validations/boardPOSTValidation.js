const Joi = require("joi")

module.exports = function(data) {
    return Joi.object({
        board_title: Joi.string().required(),
        board_phone: Joi.string().required(),
        board_budjet: Joi.string().required(),
        board_description: Joi.string().required(),
        board_type: Joi.string().required(),
    }).validateAsync(data)
}

