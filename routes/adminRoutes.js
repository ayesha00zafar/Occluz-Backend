const express = require('express');
const router = express.Router();
const {
  addDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor,
  getAllPatients
} = require('../controllers/adminController');

const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

// Admin — Doctor CRUD
router.post('/add-doctor', auth, role('admin'), addDoctor);
router.get('/doctors', auth, role('admin'), getDoctors);

// Change these two lines (doctor → singular)
router.put('/doctor/:id', auth, role('admin'), updateDoctor);
router.delete('/doctor/:id', auth, role('admin'), deleteDoctor);

// Admin — View all patients
router.get('/patients', auth, role('admin'), getAllPatients);

module.exports = router;


