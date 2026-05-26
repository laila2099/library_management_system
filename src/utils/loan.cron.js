const Loan = require('../models/Loan.model');

const runCron = async () => {
    console.log('🔄 Cron running...');

    const now = new Date();

    await Loan.updateMany(
        {
            status: 'active',
            dueDate: { $lt: now }
        },
        {
            $set: { status: 'overdue' }
        }
    );

    console.log('✅ Overdue loans updated');
};

module.exports = runCron;