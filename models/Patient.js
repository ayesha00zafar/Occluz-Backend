const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  gender: String,
  contact: String,
  email: { type: String, unique: true, sparse: true }, // unique but allows multiple nulls
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional, as some patients might not have user accounts
  }
});

module.exports = mongoose.model('Patient', patientSchema);

