const express = require('express');
const router = express.Router();

const {
  addPatient,
  getPatients,
  updatePatient,
  deletePatient
} = require('../controllers/doctorController');

const {
  createQuestionnaire,
  getDoctorQuestionnaires,
  updateQuestionnaire,
  deleteQuestionnaire
} = require('../controllers/doctorQuestionnaireController');

const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

/* --------------------------
   PATIENT CRUD ROUTES
--------------------------- */

// Doctor adds a patient
router.post('/add-patient', auth, role('doctor'), addPatient);

// Doctor views all their patients
router.get('/patients', auth, role('doctor'), getPatients);

// Doctor updates a patient
router.put('/patient/:id', auth, role('doctor'), updatePatient);

// Doctor deletes a patient
router.delete('/patient/:id', auth, role('doctor'), deletePatient);


/* --------------------------
   QUESTIONNAIRE ROUTES
--------------------------- */

// Create a new questionnaire
router.post('/questionnaire/create', auth, role('doctor'), createQuestionnaire);

// Get all questionnaires created by this doctor
router.get('/questionnaire/all', auth, role('doctor'), getDoctorQuestionnaires);

// Update questionnaire by ID
router.put('/questionnaire/update/:id', auth, role('doctor'), updateQuestionnaire);

// Delete questionnaire by ID
router.delete('/questionnaire/delete/:id', auth, role('doctor'), deleteQuestionnaire);


module.exports = router;
