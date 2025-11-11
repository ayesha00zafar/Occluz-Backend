const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.addDoctor = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingDoctor = await User.findOne({ email });
    if (existingDoctor) return res.status(400).json({ message: 'Doctor already exists' });

    const passwordHash = await bcrypt.hash(password, 10);

    const newDoctor = new User({
      name,
      email,
      passwordHash,
      role: 'doctor'
    });

    await newDoctor.save();
    res.status(201).json({ message: 'Doctor added successfully', doctor: newDoctor });
  } catch (error) {
    res.status(500).json({ message: 'Error adding doctor', error });
  }
};
