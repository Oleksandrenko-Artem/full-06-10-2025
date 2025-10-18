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

module.exports.getAccountOrders = async (req, res, next) => {
    try {
        const { limit, skip } = req.pagination;
        const orders = await Order.find({ user: req.user._id }).populate('products.productId', 'title').skip(skip).limit(limit);
        res.status(200).send({ data: orders });
    } catch (error) {
        next(error);
    }
};

module.exports.getOneOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.orderId).populate('user', 'email').populate('products.productId', 'title');
        if (!order) {
            throw createError(404, 'Order not found');
        }
        if (req.user.role !== 'admin') {
            if (req.user._id.toString() !== order.user._id.toString()) {
                throw createError(403, 'Permission denided');
            }
        }
        res.status(200).send({ data: order });
    } catch (error) {
        next(error);
    }
};

module.exports.updateStatusOrder = async (req, res, next) => {
    try {
        const { status } = req.body;
        const { orderId } = req.params;
        const order = await Order.findById(orderId);
        if (!order) {
            throw createError(404, 'Order not found');
        }
        order.status = status;
        await order.save();
        res.status(200).send({ data: order });
    } catch (error) {
        next(error);
    }
};