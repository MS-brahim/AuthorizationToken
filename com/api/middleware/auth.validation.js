const Joi = require('@hapi/joi');

// VALIDATION REGISTER
const registerValidation = data =>{
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .required(),
        phone: Joi.string()
            .min(13)
            .required(),
        password: Joi.string()
            .min(3)
            .required()
    });
    return schema.validate(data)
}

// VALIDATION LOGIN 
const loginValidation = data =>{
    const schema = Joi.object({
        phone: Joi.string()
            .min(13)
            .required(),
        password: Joi.string()
            .min(3)
            .required()
    });
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;