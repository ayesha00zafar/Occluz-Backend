const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const {
  submitQuestionnaire,
  getMyQuestionnaires,
  getTreatmentPlan
} = require('../controllers/patientController');

// Get all questionnaires assigned to the patient
router.get('/questionnaires', auth, role('patient'), getMyQuestionnaires);

// Submit answers for a questionnaire
router.post('/questionnaires/:id/fill', auth, role('patient'), submitQuestionnaire);

// Get latest treatment plan
router.get('/treatment-plan', auth, role('patient'), getTreatmentPlan);

module.exports = router;
