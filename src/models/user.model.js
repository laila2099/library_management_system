const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['member', 'librarian', 'manager'], required: true },
    registeredAt: { type: Date, default: Date.now },

    address: { type: String, required: function () { return this.role === 'member'; } },
    dateOfBirth: { type: Date, required: function () { return this.role === 'member'; } },
    membershipNumber: { type: String, unique: true, sparse: true },

    responsibleDepartment: { type: String, required: function () { return this.role === 'librarian'; } }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);