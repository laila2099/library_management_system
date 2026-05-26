const express = require('express');
const router = express.Router();

const { createLoan, returnLoan } = require('../controllers/loan.controller');
const { createEntity, getAllEntities } = require('../controllers/basic.controller');

const User = require('../models/User.model');
const Loan = require('../models/Loan.model');
const Material = require('../models/Material.model');
const Review = require('../models/Review.model');
const Reservation = require('../models/Reservation.model');

router.route('/users')
    .post(createEntity(User))
    .get(getAllEntities(User));

router.route('/materials')
    .post(createEntity(Material))
    .get(getAllEntities(Material));

router.put('/users/:id', async (req, res) => {
    try {
        const updated = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ error: "Not found" });
        }

        res.json({ success: true, data: updated });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/materials/:id', async (req, res) => {
    try {
        const updated = await Material.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ error: "Not found" });
        }

        res.json({ success: true, data: updated });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.route('/loans')
    .post(createLoan)
    .get(getAllEntities(Loan));

router.route('/loans/:id/return')
    .put(returnLoan);

router.route('/reservations')
    .post(createEntity(Reservation))
    .get(getAllEntities(Reservation));

router.route('/reviews')
    .post(createEntity(Review))
    .get(getAllEntities(Review));

module.exports = router;