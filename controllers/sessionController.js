const Session = require("../models/Session");

// Create a new session
exports.createSession = async (req, res) => {
  try {
    const { doctorId, patientId, date, time, notes } = req.body;
    const session = await Session.create({ doctorId, patientId, date, time, notes });
    res.status(201).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all sessions for a doctor
exports.getDoctorSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ doctorId: req.params.id }).populate("patientId", "name age gender");
    res.status(200).json({ success: true, count: sessions.length, sessions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all sessions for a patient
exports.getPatientSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ patientId: req.params.id }).populate("doctorId", "name specialization");
    res.status(200).json({ success: true, count: sessions.length, sessions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update session status
exports.updateSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!session) return res.status(404).json({ success: false, message: "Session not found" });
    res.status(200).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
