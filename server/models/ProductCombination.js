const mongoose = require('mongoose');

const ProductCombinationSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    materialId: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true },
    gradeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Grade', required: true },
    name: { type: String, required: true }, // Generated name: "Stainless Steel 304 Pipes"
    price: { type: Number, default: 0 },
    currency: { type: String, default: 'INR' },
    shape: { type: String, default: '' },
    length: { type: Number, default: 0 },
    thickness: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProductCombination', ProductCombinationSchema);