require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// connect DB
connectDB();

// middlewares
app.use(cors());
app.use(express.json());

// simple health route
app.get('/api/health', (req, res) => {
  res.json({ status: 'API running', time: new Date().toISOString() });
});

// placeholder route import (create later)
app.use('/api/users', require('./routes/userRoutes'));

// error handling middleware (basic)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
