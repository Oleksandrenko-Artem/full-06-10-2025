const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, minLength: 3, maxLength: 64, required: true, unique: true },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;