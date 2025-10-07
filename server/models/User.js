const mongoose = require('mongoose');
const CONSTANTS = require('../constants');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minLength: 5, maxLength: 255 },
    email: { type: String, required: true, unique: true, lowercase: true },
    birthYear: { type: Number, required: true },
    password: { type: String, required: true },
    role: {
        type: String, enum: CONSTANTS.USER_ROLES, default: CONSTANTS.USER_ROLES[0] // customer 
    },
}, { timestamps: true });

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
}

const User = mongoose.model('User', userSchema);

module.exports = User;