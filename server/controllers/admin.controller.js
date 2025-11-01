const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

module.exports.getAdminStatistic = async (req, res, next) => {
    try {
        const users = await User.countDocuments();
        const orders = await Order.countDocuments();
        const products = await Product.countDocuments();
        res.status(200).send({ data: { users, orders, products } });
    } catch (error) {
        next(error);
    }
};