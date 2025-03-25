const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Stainless Steel, Carbon Steel, etc.
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Material', MaterialSchema);