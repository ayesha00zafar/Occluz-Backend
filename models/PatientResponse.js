const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Questionnaire.questions', required: true },
  answer: { type: String, required: true }
}, { _id: false });

const patientResponseSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questionnaireId: { type: mongoose.Schema.Types.ObjectId, ref: 'Questionnaire', required: true },
  answers: [answerSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PatientResponse', patientResponseSchema);

