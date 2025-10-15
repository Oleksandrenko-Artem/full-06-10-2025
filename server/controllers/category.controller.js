const createError = require('http-errors');
const Category = require("../models/Category");
const Product = require('../models/Product');

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

module.exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).send({ data: categories });
    } catch (error) {
        next(error);
    }
};

module.exports.getCategoryById = async (req, res, next) => {
    try {
        const { idCategory } = req.params;
        const category = await Category.findById(idCategory).populate('products');
        if (!category) {
            throw createError(404, 'Category not found');
        }
        res.status(200).send({ data: category });
    } catch (error) {
        next(error);
    }
};

module.exports.updateCategoryById = async (req, res, next) => {
    try {
        const { idCategory } = req.params;
        const category = await Category.findByIdAndUpdate(idCategory, req.body, { new: true });
        if (!category) {
            throw createError(404, 'Category not found');
        }
        res.status(200).send({ data: category });
    } catch (error) {
        if (error.code === 11000) {
            next(createError(409, 'Category with this name is already exists'));
        }
        next(error);
    }
};

module.exports.deleteCategoryById = async (req, res, next) => {
    try {
        const { idCategory } = req.params;
        const products = await Product.find({ category: idCategory });
        if (products.length) {
            throw createError(409, 'Category have products');
        }
        const category = await Category.findByIdAndDelete(idCategory);
        if (!category) {
            throw createError(404, 'Category not found');
        }
        res.status(200).send({ data: category });
    } catch (error) {
        next(error);
    }
};