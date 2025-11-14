const express = require('express');
const router = express.Router();
const {
  addPatient,
  getPatients,
  updatePatient,
  deletePatient
} = require('../controllers/doctorController');

const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

// Doctor adds a patient
router.post('/add-patient', auth, role('doctor'), addPatient);

// Doctor views all their patients
router.get('/patients', auth, role('doctor'), getPatients);

// Doctor updates a patient
router.put('/patient/:id', auth, role('doctor'), updatePatient);

// Doctor deletes a patient
router.delete('/patient/:id', auth, role('doctor'), deletePatient);

module.exports = router;
