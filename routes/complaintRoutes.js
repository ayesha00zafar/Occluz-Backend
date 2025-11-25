const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createComplaint,
  getAllComplaints,
  getMyComplaints,
} = require("../controllers/complaintController");

// PATIENT creates complaint
router.post("/", authMiddleware, createComplaint);

// ADMIN/DOCTOR sees all complaints
router.get("/", authMiddleware, getAllComplaints);

// PATIENT sees their own complaints
router.get("/mine", authMiddleware, getMyComplaints);

module.exports = router;
