const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, minLength: 3, maxLength: 64, required: true, unique: true },
});

categorySchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'category'
});

categorySchema.set('toObject', { virtual: true });
categorySchema.set('toJSON', { virtual: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;