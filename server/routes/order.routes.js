const express = require('express');
const { auth, isAdmin, canUpdateOrderStatus } = require('../middlewares/auth.mw');
const { validate } = require('../middlewares/validate.mw');
const { paginate } = require('../middlewares/pagination.mw');
const { filterOrders } = require('../middlewares/filter.mw');
const { createOrderSchema, updateStatusOrderSchema } = require('../validators/order.validator');
const { createOrder, getAllOrders, getAccountOrders, getOneOrder, updateStatusOrder, createCheckoutSession, countAllOrders } = require('../controllers/order.controller');

const router = express.Router();

router.post('/', auth, validate(createOrderSchema), createOrder);
router.post('/create-checkout-session', createCheckoutSession);
router.get('/', auth, isAdmin, paginate, filterOrders, getAllOrders);
router.get('/account', auth, paginate, getAccountOrders);
router.get('/countAllOrders', auth, isAdmin, filterOrders, countAllOrders);
router.get('/:orderId', auth, getOneOrder);
router.patch('/:orderId', auth, canUpdateOrderStatus, validate(updateStatusOrderSchema), updateStatusOrder);

module.exports = router;