const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }, // e.g., "14:30"
  status: {
    type: String,
    enum: ["scheduled", "pending", "completed", "cancelled"],
    default: "scheduled",
  },
  notes: { type: String },
  agenda: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Session", sessionSchema);
