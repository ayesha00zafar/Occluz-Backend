const express = require("express");
const router = express.Router();
const {
  createSession,
  getDoctorSessions,
  getPatientSessions,
  updateSession
} = require("../controllers/sessionController");

const authMiddleware  = require("../middlewares/authMiddleware");

// Book a session
router.post("/", authMiddleware, createSession);

// Get sessions for a doctor
router.get("/doctor/:id", authMiddleware, getDoctorSessions);

// Get sessions for a patient
router.get("/patient/:id", authMiddleware, getPatientSessions);

// Update session (status, notes, etc.)
router.put("/:id", authMiddleware, updateSession);

module.exports = router;
