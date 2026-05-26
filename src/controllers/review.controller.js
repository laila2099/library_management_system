const Review = require('../models/Review.model');

exports.addReview = async (req, res) => {
    try {
        const { member, material } = req.body;

        const exists = await Review.findOne({ member, material });

        if (exists) {
            return res.status(400).json({
                error: 'You already reviewed this material'
            });
        }

        const review = await Review.create(req.body);

        res.status(201).json({ success: true, data: review });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Duplicate review' });
        }
        res.status(500).json({ error: error.message });
    }
};