const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
    name: { type: String, required: true }, // 304, A105, etc.
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Grade', GradeSchema);