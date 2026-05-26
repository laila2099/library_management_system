const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api.routes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/v1', apiRoutes);

app.use((req, res) => {
    res.status(404).json({ success: false, error: 'Endpoint Not Found' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
const runCron = require('./utils/loan.cron');

setInterval(runCron, 1000 * 60 * 60); 

const runReservationCron = require('./utils/reservation.cron');

setInterval(runReservationCron, 1000 * 60 * 60);