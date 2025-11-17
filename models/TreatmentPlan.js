const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema({
  description: { type: String, required: true },
  completed: { type: Boolean, default: false }
}, { _id: false });

const treatmentPlanSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdFrom: { type: mongoose.Schema.Types.ObjectId, ref: 'PatientResponse', required: true },
  steps: [stepSchema],
  progress: { type: Number, default: 0 }, // 0-100
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TreatmentPlan', treatmentPlanSchema);

