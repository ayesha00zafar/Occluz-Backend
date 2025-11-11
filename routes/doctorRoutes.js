const express = require('express');
const router = express.Router();
const { addPatient } = require('../controllers/doctorController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

router.post('/add-patient', auth, role('doctor'), addPatient);

module.exports = router;
