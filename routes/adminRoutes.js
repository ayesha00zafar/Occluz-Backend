const express = require('express');
const router = express.Router();
const { addDoctor } = require('../controllers/adminController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

router.post('/add-doctor', auth, role('admin'), addDoctor);

module.exports = router;
