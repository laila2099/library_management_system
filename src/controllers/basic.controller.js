exports.createEntity = (Model) => async (req, res) => {
    try {
        const doc = await Model.create(req.body);
        res.status(201).json({ success: true, data: doc });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Duplicate entry detected' });
        }
        res.status(500).json({ error: error.message });
    }
};

exports.getAllEntities = (Model) => async (req, res) => {
    try {
        const docs = await Model.find();
        res.json({ success: true, count: docs.length, data: docs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};