const Prescription = require("../models/Prescription");

// Create a new prescription
exports.createPrescription = async (req, res) => {
  try {
    const { patientId, items, notes } = req.body;

    const prescription = await Prescription.create({
      doctorId: req.user.id,
      patientId,
      items,
      notes
    });

    res.status(201).json({
      success: true,
      message: "Prescription created successfully",
      prescription
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating prescription", error });
  }
};

// Get all prescriptions for a patient
exports.getPrescriptionsForPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    const prescriptions = await Prescription.find({ patientId });

    res.status(200).json({ success: true, prescriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching prescriptions", error });
  }
};

// Get a single prescription
exports.getSinglePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);

    res.status(200).json({ success: true, prescription });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching prescription", error });
  }
};

// Delete prescription
exports.deletePrescription = async (req, res) => {
  try {
    await Prescription.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Prescription deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting prescription", error });
  }
};
