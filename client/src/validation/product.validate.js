import * as yup from 'yup'

const titleSchema = yup.string().trim().min(3).max(255);
const priceSchema = yup.number().positive().max(1000000000);
const stockQtySchema = yup.number().min(0).max(1000);

export const productCreateSchema = yup.object({
    title: titleSchema.required(),
    description: yup.string().trim(),
    price: priceSchema.required(),
    stockQty: stockQtySchema,
    category: yup.string().required(),
    isSale: yup.boolean(),
});

export const productUpdateSchema = yup.object({
    title: titleSchema,
    description: yup.string().trim(),
    price: priceSchema,
    stockQty: stockQtySchema,
    category: yup.string(),
    isSale: yup.boolean(),
});