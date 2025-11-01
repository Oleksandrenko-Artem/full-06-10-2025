import * as yup from 'yup';

const nameSchema = yup.string().trim().min(5).max(255);
const emailSchema = yup.string().trim().email();
const birthYearSchema = yup.number().min(1900).max(new Date().getFullYear());
const passwordSchema = yup.string().trim().min(5);

export const loginValidateSchema = yup.object({
    email: emailSchema,
    password: passwordSchema,
});

export const registerValidateSchema = yup.object({
    name: nameSchema.required(),
    email: emailSchema.required(),
    birthYear: birthYearSchema.required(),
    password: passwordSchema.required(),
});

export const updateUserValidateSchema = yup.object({
    name: nameSchema,
    email: emailSchema,
    birthYear: birthYearSchema,
    password: passwordSchema,
});