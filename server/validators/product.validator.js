const Yup = require('yup');

const titleSchema = Yup.string().trim().min(3).max(255);
const priceSchema = Yup.number().positive().max(1000000000);
const stockQtySchema = Yup.number().min(0).max(1000);

module.exports.createProductSchema = Yup.object({
    title: titleSchema.required(),
    description: Yup.string().trim(),
    price: priceSchema.required(),
    stockQty: stockQtySchema,
    category: Yup.string().required(),
    isSale: Yup.boolean(),
});

module.exports.updateProductSchema = Yup.object({
    title: titleSchema,
    description: Yup.string().trim(),
    price: priceSchema,
    stockQty: stockQtySchema,
    category: Yup.string(),
    isSale: Yup.boolean(),
});