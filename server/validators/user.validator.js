const Yup = require('yup');
const CONSTANTS = require('../constants');

module.exports.registerSchema = Yup.object({
    name: Yup.string().trim().min(5).max(255).required(),
    email: Yup.string().trim().email().required(),
    birthYear: Yup.number().required(),
    password: Yup.string().trim().min(8).max(255).required(),
    role: Yup.string().oneOf(CONSTANTS.USER_ROLES),
});