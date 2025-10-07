const Yup = require('yup');

module.exports.registerSchema = Yup.object({
    name: Yup.string().trim()
})