const Patient = require('../models/Patient');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// ========================
// ADD PATIENT
// ========================
exports.addPatient = async (req, res) => {
  try {
    const { name, age, gender, contact, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create user account for patient
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      passwordHash,
      role: 'patient'
    });
    await newUser.save();

    // Create patient record
    const patient = new Patient({
      name,
      age,
      gender,
      contact,
      email,
      doctorId: req.user.id, // obtained from JWT token
      userId: newUser._id // link to user account
    });

    await patient.save();
    res.status(201).json({ message: 'Patient added successfully', patient });

  } catch (error) {
    res.status(500).json({ message: 'Error adding patient', error: error.message });
  }
};

// ========================
// GET ALL PATIENTS (for this doctor)
// ========================
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ doctorId: req.user.id });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error: error.message });
  }
};

// ========================
// UPDATE PATIENT
// ========================
exports.updatePatient = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure doctor can only update their own patient
    const patient = await Patient.findOne({ _id: id, doctorId: req.user.id });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    const { name, age, gender, contact, email } = req.body;
    if (name) patient.name = name;
    if (age) patient.age = age;
    if (gender) patient.gender = gender;
    if (contact) patient.contact = contact;
    if (email) patient.email = email;

    await patient.save();
    res.json({ message: 'Patient updated successfully', patient });

  } catch (error) {
    res.status(500).json({ message: 'Error updating patient', error: error.message });
  }
};

// ========================
// DELETE PATIENT
// ========================
exports.deletePatient = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure doctor can only delete their own patient
    const patient = await Patient.findOne({ _id: id, doctorId: req.user.id });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    // Delete associated user account if exists
    if (patient.userId) {
      await User.findByIdAndDelete(patient.userId);
    }

    await patient.deleteOne();
    res.json({ message: 'Patient deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Error deleting patient', error: error.message });
  }
};

