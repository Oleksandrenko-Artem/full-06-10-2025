const express = require('express');
const { createCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById } = require('../controllers/category.controller');
const { categorySchema } = require('../validators/category.validator');
const { auth, isAdmin } = require('../middlewares/auth.mw');
const { validate } = require('../middlewares/validate.mw');

const router = express.Router();

router.post('/', auth, isAdmin, validate(categorySchema), createCategory);
router.get('/', getAllCategories);
router.get('/:idCategory', getCategoryById);
router.patch('/:idCategory', auth, isAdmin, validate(categorySchema), updateCategoryById);
router.delete('/:idCategory', auth, isAdmin, deleteCategoryById);

module.exports = router;