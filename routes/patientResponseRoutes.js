const express = require("express");
const router = express.Router();

const {
  submitResponse,
  getResponsesByPatient,
  getSingleResponse
} = require("../controllers/patientResponseController");


const authMiddleware = require("../middlewares/authMiddleware");

// PATIENT submits questionnaire response
router.post("/", authMiddleware, submitResponse);

// Get a single response
router.get("/view/:id", authMiddleware, getSingleResponse);

// Doctor OR patient gets all responses from a patient
router.get("/:patientId", authMiddleware, getResponsesByPatient);

module.exports = router;

