const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    materialType: { type: String, enum: ['book', 'magazine', 'cd', 'map'], required: true },
    title: { type: String, required: true },
    publisher: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    category: { type: String, required: true },
    totalCopies: { type: Number, required: true, min: 0 },
    availableCopies: { type: Number, required: true, min: 0 },
    coverImageUrl: { type: String },

    author: { type: String, required: function () { return ['book', 'cd'].includes(this.materialType); } },
    isbn: { type: String, required: function () { return this.materialType === 'book'; } },

    issueNumber: Number,
    month: String,
    year: Number
}, { timestamps: true });

module.exports = mongoose.model('Material', materialSchema);