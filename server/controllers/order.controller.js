const createError = require('http-errors');
const Product = require('../models/Product');
const Order = require('../models/Order');

module.exports.createOrder = async (req, res, next) => {
    try {
        const { products, shippingPhone, shippingMethod, shippingAddress, shippingPrice } = req.body;
        let totalSum = 0;
        const productsValidated = await Promise.all(
            products.map(async ({ productId, quantity }) => {
                const product = await Product.findById(productId);
                if (!product) {
                    throw createError(404, 'Product not found');
                }
                if (product.stockQty < quantity) {
                    throw createError(409, 'Not enough in stock ' + product.title);
                }
                product.stockQty -= quantity;
                await product.save();
                totalSum += product.price * quantity;
                return {
                    productId,
                    productPrice: product.price,
                    quantity
                }
            })
        );
        const order = await Order.create({
            user: req.user._id,
            products: productsValidated,
            shippingPhone,
            shippingMethod,
            shippingAddress,
            shippingPrice,
            totalSum
        });
        res.status(201).send({ data: order });
    } catch (error) {
        next(error);
    }
};

module.exports.getAllOrders = async (req, res, next) => {
    try {
        const { limit, skip } = req.pagination;
        const orders = await Order.find(req.filter).populate('user', 'email name').populate('products.productId', 'title').skip(skip).limit(limit);
        res.status(200).send({ data: orders });
    } catch (error) {
        next(error);
    }
};