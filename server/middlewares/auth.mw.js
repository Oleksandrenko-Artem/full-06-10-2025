const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const CONSTANTS = require('../constants');
const User = require('./../models/User');
const Order = require('../models/Order');

module.exports.auth = async (req, res, next) => { 
    try {
        const rowAuthorization = req.headers.authorization;
        const token = rowAuthorization?.replace('Bearer', '').trim();
        if (!token) {
            return next(createError(401, 'Token required'));
        }
        const decoded = jwt.verify(token, CONSTANTS.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        if (!user) {
            return next(createError(401, 'Invalid token'));
        }
        req.user = user;
        next();
    } catch (error) {
        console.log('auth error --->', error);
        next(createError(401, 'Unauthorized'));
    }
};

module.exports.isAdmin = async (req, res, next) => {
    if (req.user?.role === 'admin') {
        return next();
    }
    next(createError(403, 'Only admin'));
};

module.exports.isOwner = async (req, res, next) => {
    if (req.params.idUser === req.user._id.toString()) {
        return next();
    }
    next(createError(403, 'Only owner'));
};

module.exports.canUpdateOrderStatus = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return next(createError(404, 'Order not found'));
        }
        if (req.user.role === 'admin' || req.user._id.toString() === order.user.toString()) {
            return next();
        }
        return next(createError(403, "You haven't permission"));
    } catch (error) {
        next(createError(403, "You haven't permission"));
    }
};