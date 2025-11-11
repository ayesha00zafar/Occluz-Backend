const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');

const userRoutes = require('./routes/userRoutes'); 
const adminRoutes = require('./routes/adminRoutes');
const doctorRoutes = require('./routes/doctorRoutes');

dotenv.config();
connectDB(); // use your db.js connection

const app = express();
app.use(express.json());

// Routes
app.use('/api/users', userRoutes); 
app.use('/api/admin', adminRoutes);
app.use('/api/doctor', doctorRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


