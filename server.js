const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');

const userRoutes = require('./routes/userRoutes'); 
const adminRoutes = require('./routes/adminRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const questionnaireRoutes = require('./routes/questionnaireRoutes'); // <-- IMPORTANT
const patientRoutes = require('./routes/patientRoutes');

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/questionnaires', questionnaireRoutes); // <-- ADD THIS
app.use('/api/patient', patientRoutes);

// Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



