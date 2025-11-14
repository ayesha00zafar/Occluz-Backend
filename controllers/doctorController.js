const Patient = require('../models/Patient');

// ========================
// ADD PATIENT
// ========================
exports.addPatient = async (req, res) => {
  try {
    const { name, age, gender, contact } = req.body;

    const patient = new Patient({
      name,
      age,
      gender,
      contact,
      doctorId: req.user.id // obtained from JWT token
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

    const { name, age, gender, contact } = req.body;
    if (name) patient.name = name;
    if (age) patient.age = age;
    if (gender) patient.gender = gender;
    if (contact) patient.contact = contact;

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

    await patient.deleteOne();
    res.json({ message: 'Patient deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Error deleting patient', error: error.message });
  }
};

