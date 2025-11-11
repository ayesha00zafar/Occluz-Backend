const Patient = require('../models/Patient');

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
    res.status(500).json({ message: 'Error adding patient', error });
  }
};

