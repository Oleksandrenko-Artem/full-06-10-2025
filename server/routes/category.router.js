const express = require('express');
const { createCategory } = require('../controllers/category.controller');
const { categorySchema } = require('../validators/category.validator');
const { auth, isAdmin } = require('../middlewares/auth.mw');
const { validate } = require('../middlewares/validate.mw');

const router = express.Router();

router.post('/', auth, isAdmin, validate(categorySchema), createCategory);

module.exports = router;