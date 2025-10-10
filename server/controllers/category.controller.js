const createError = require('http-errors');
const Category = require("../models/Category");

module.exports.createCategory = async (req, res, next) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).send({ data: category });
    } catch (error) {
        if (error.code === 11000) {
            next(createError(409, 'Category with this name is already exists'));
        }
        next(error);
    }
};