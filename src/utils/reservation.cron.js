const Reservation = require('../models/Reservation.model');

const runReservationCron = async () => {
    try {
        const now = new Date();

        await Reservation.deleteMany({
            autoCancelAfter: { $lt: now }
        });

        console.log('🧹 Expired reservations cleaned');
    } catch (error) {
        console.error('Cron Error:', error.message);
    }
};

module.exports = runReservationCron;