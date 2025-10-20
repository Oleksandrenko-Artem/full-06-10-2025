import * as yup from 'yup';

const emailSchema = yup.string().trim().email().required();
const passwordSchema = yup.string().trim().min(5).required();

export const loginValidateSchema = yup.object({
    email: emailSchema,
    password: passwordSchema,
});

export const registerValidateSchema = yup.object({
    name: yup.string().trim().min(5).max(255).required(),
    email: emailSchema,
    birthYear: yup.number().min(1900).max(new Date().getFullYear()).required(),
    password: passwordSchema,
});