const express = require('express');
const { validate } = require('../middlewares/validate.mw');
const { auth, isAdmin } = require('../middlewares/auth.mw');
const upload = require('../middlewares/upload.mw');
const { paginate } = require('../middlewares/pagination.mw');
const { filterProducts } = require('../middlewares/filter.mw');
const { createProductSchema, updateProductSchema } = require('../validators/product.validator');
const { createProduct, getAllProducts, getProductById, updateProductById, deleteProductById } = require('../controllers/product.controller');
const CONSTANTS = require('../constants');

const router = express.Router();

router.post('/', auth, isAdmin, upload.array('images', CONSTANTS.MAX_LIMIT_IMG), validate(createProductSchema), createProduct);
router.get('/', filterProducts, paginate, getAllProducts);
router.get('/:idProduct', getProductById);
router.patch('/:idProduct', auth, isAdmin, upload.array('images', CONSTANTS.MAX_LIMIT_IMG), validate(updateProductSchema), updateProductById);
router.delete('/:idProduct', auth, isAdmin, deleteProductById);

module.exports = router;