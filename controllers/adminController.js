const bcrypt = require('bcrypt');
const User = require('../models/User');

// ========================
// ADD DOCTOR
// ========================
exports.addDoctor = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingDoctor = await User.findOne({ email });
    if (existingDoctor)
      return res.status(400).json({ message: 'Doctor already exists' });

    const passwordHash = await bcrypt.hash(password, 10);

    const newDoctor = new User({
      name,
      email,
      passwordHash,
      role: 'doctor'
    });

    await newDoctor.save();

    res.status(201).json({
      message: 'Doctor added successfully',
      doctor: newDoctor
    });

  } catch (error) {
    res.status(500).json({ message: 'Error adding doctor', error: error.message });
  }
};

// ========================
// GET ALL DOCTORS
// ========================
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' }).select('-passwordHash');
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error: error.message });
  }
};

// ========================
// UPDATE DOCTOR
// ========================
exports.updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Only hash password if provided
    if (updates.password) {
      updates.passwordHash = await bcrypt.hash(updates.password, 10);
    }
    delete updates.password; // remove plain password

    // Update doctor, allow partial updates
    const updatedDoctor = await User.findOneAndUpdate(
      { _id: id, role: 'doctor' },
      updates,
      { new: true, runValidators: false } // avoid passwordHash validation error
    ).select('-passwordHash');

    if (!updatedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json({ message: 'Doctor updated successfully', doctor: updatedDoctor });

  } catch (error) {
    res.status(500).json({ message: 'Error updating doctor', error: error.message });
  }
};

// ========================
// DELETE DOCTOR
// ========================
exports.deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await User.findOne({ _id: id, role: 'doctor' });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    await doctor.deleteOne();

    res.json({ message: 'Doctor deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Error deleting doctor', error: error.message });
  }
};

// ========================
// GET ALL PATIENTS
// ========================
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: 'patient' }).select('-passwordHash');
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error: error.message });
  }
};

