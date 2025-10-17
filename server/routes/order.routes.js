const express = require('express');
const { auth, isAdmin } = require('../middlewares/auth.mw');
const { validate } = require('../middlewares/validate.mw');
const { paginate } = require('../middlewares/pagination.mw');
const { filterOrders } = require('../middlewares/filter.mw');
const { createOrderSchema } = require('../validators/order.validator');
const { createOrder, getAllOrders } = require('../controllers/order.controller');

const router = express.Router();

router.post('/', auth, validate(createOrderSchema), createOrder);
router.get('/', auth, isAdmin, paginate, filterOrders, getAllOrders);

module.exports = router;