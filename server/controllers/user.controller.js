const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const User = require("../models/User");

module.exports.registerUser = async (req, res, next) => {
    try {
        const { name, email, birthYear, password, role } = req.body;
        const exists = await User.findOne({ email });
        if (exists) {
            throw createError(409, 'Email already registeres');
        }
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, birthYear, role, password: hash });
        res.status(201).send({ data: user });
    } catch (error) {
        next(error);
    }
};