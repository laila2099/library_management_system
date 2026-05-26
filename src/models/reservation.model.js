const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    material: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true },
    member: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    reservedAt: { type: Date, default: Date.now },

    queuePriority: { type: Number, required: true },

    notifiedWhenAvailable: { type: Boolean, default: false },

    autoCancelAfter: { type: Date, required: true }

}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);