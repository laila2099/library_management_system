const Reservation = require('../models/Reservation.model');
const Material = require('../models/Material.model');

exports.createReservation = async (req, res) => {
    try {
        const { material, member, queuePriority } = req.body;

        const item = await Material.findById(material);
        if (!item) {
            return res.status(404).json({ error: 'Material not found' });
        }

        if (item.availableCopies > 0) {
            return res.status(400).json({
                error: 'No need to reserve available material'
            });
        }

        const autoCancelAfter = new Date();
        autoCancelAfter.setDate(autoCancelAfter.getDate() + 3);

        const reservation = await Reservation.create({
            material,
            member,
            queuePriority,
            autoCancelAfter
        });

        res.status(201).json({ success: true, data: reservation });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};