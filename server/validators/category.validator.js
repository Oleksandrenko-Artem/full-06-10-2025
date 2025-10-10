const Yup = require('yup');

module.exports.categorySchema = Yup.object({
    name: Yup.string().trim().min(3).max(64).required()
});