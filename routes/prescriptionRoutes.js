const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
  createPrescription,
  getPrescriptionsForPatient,
  getSinglePrescription,
  deletePrescription
} = require("../controllers/prescriptionController");

router.post("/", authMiddleware, createPrescription); // doctor creates prescription
router.get("/:patientId", authMiddleware, getPrescriptionsForPatient);
router.get("/view/:id", authMiddleware, getSinglePrescription);
router.delete("/:id", authMiddleware, deletePrescription);

module.exports = router;
