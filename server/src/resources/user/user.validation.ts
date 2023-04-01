import Joi from 'joi';

const register = Joi.object({
    firstname: Joi.string().max(150).required(),

    lastname: Joi.string().max(150),

    phoneNumber: Joi.string().max(150).allow(null, ''),

    email: Joi.string().email().required(),
    
    password: Joi.string().min(6).required(),
});

const login = Joi.object({
    email: Joi.string().required(),

    password: Joi.string().required(),
});

const forgotPassword = Joi.object({
    email: Joi.string().required(),
});

const changePassword = Joi.object({
    email: Joi.string().required(),

    secretCode: Joi.string().required(),

    newPassword: Joi.string().required(),
});

const changePasswordForProfile = Joi.object({
    newPassword: Joi.string().required(),

    confirmNewPassword: Joi.string().required(),
});

export default { register, login, forgotPassword, changePassword, changePasswordForProfile };
