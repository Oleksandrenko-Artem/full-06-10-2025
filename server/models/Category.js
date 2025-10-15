const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, minLength: 3, maxLength: 64, required: true, unique: true },
});

categorySchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'category'
});

categorySchema.set('toObject', { virtuals: true });
categorySchema.set('toJSON', { virtuals: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;