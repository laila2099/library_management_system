const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    material: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true },
    member: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    reviewText: String
}, { timestamps: true });

// hard rule (DB level)
reviewSchema.index({ member: 1, material: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);