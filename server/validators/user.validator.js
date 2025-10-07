const Yup = require('yup');
const CONSTANTS = require('../constants');

const emailSchema = Yup.string().trim().email();
const passwordSchema = Yup.string().trim().min(8).max(255);

module.exports.registerSchema = Yup.object({
    name: Yup.string().trim().min(5).max(255).required(),
    email: emailSchema.required(),
    birthYear: Yup.number().required(),
    password: passwordSchema.required(),
    role: Yup.string().oneOf(CONSTANTS.USER_ROLES),
});

module.exports.loginSchema = Yup.object({
    email: emailSchema.required(),
    password: passwordSchema.required(),
});