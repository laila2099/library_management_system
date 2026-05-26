const Loan = require('../models/Loan.model');
const Material = require('../models/Material.model');

exports.createLoan = async (req, res) => {
    try {
        const { member, material, recordedBy } = req.body;

        // prevent duplicate active loan
        const existing = await Loan.findOne({
            member,
            material,
            status: 'active'
        });

        if (existing) {
            return res.status(400).json({ error: 'Already borrowed this material' });
        }

        const item = await Material.findById(material);
        if (!item) return res.status(404).json({ error: 'Material not found' });

        if (item.availableCopies <= 0) {
            return res.status(400).json({ error: 'No copies available' });
        }

        const loanDate = new Date();
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14);

        const loan = await Loan.create({
            member,
            material,
            recordedBy,
            loanDate,
            dueDate
        });

        await Material.findByIdAndUpdate(material, {
            $inc: { availableCopies: -1 }
        });

        res.status(201).json({ success: true, data: loan });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.returnLoan = async (req, res) => {
    try {
        const loan = await Loan.findById(req.params.id);
        if (!loan) return res.status(404).json({ error: 'Loan not found' });

        if (loan.status !== 'active') {
            return res.status(400).json({ error: 'Loan already closed' });
        }

        const now = new Date();

        const overdue = now > loan.dueDate;

        const days = overdue
            ? Math.ceil((now - loan.dueDate) / (1000 * 60 * 60 * 24))
            : 0;

        const fine = days * loan.finePerDay;

        loan.actualReturnDate = now;
        loan.status = overdue ? 'overdue' : 'returned';
        loan.totalFineAmount = fine;

        await loan.save();

        await Material.findByIdAndUpdate(loan.material, {
            $inc: { availableCopies: 1 }
        });

        res.json({ success: true, data: loan });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};