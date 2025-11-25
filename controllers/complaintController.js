const Complaint = require("../models/Complaint");

// CREATE complaint (Patient)
exports.createComplaint = async (req, res) => {
  try {
    const { title, message } = req.body;

    const complaint = await Complaint.create({
      patientId: req.user.id,
      title,
      message,
    });

    res.status(201).json({ success: true, complaint });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating complaint", error });
  }
};

// GET all complaints (Admin/Doctor)
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("patientId", "name email");

    res.status(200).json({ success: true, complaints });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching complaints", error });
  }
};

// GET complaints of logged-in patient
exports.getMyComplaints = async (req, res) => {
  try {
    const myComplaints = await Complaint.find({ patientId: req.user.id });

    res.status(200).json({ success: true, complaints: myComplaints });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching your complaints", error });
  }
};
