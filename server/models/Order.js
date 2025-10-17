const mongoose = require('mongoose');
const CONSTANTS = require('../constants');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            productPrice: {
                type: Number,
                min: 0.01,
                max: 1000000000,
                required: true,
            },
            quantity: {
                type: Number,
                min: 1,
                max: 1000,
                default: 1,
            },
        },
    ],
    shippingPhone: {
        type: String,
        required: true,
    },
    shippingMethod: {
        type: String,
        enum: CONSTANTS.SHIPPING_METHOD,
        default: CONSTANTS.SHIPPING_METHOD[0],
    },
    shippingAddress: {
        type: String,
    },
    shippingPrice: {
        type: Number,
        default: 0,
        required: true,
    },
    totalSum: { // виключно сума продуктів без доставки
        type: Number,
        min: 0.01,
        required: true,
    },
    status: {
        type: String,
        enum: CONSTANTS.ORDER_STATUS,
        default: CONSTANTS.ORDER_STATUS[0],
    },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;