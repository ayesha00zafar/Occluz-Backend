const mongoose = require("mongoose");

// Each answer contains the text of the question + the patient's answer
const answerSchema = new mongoose.Schema(
  {
    questionText: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false }
);

const patientResponseSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",   // patient is a user
    required: true,
  },

  questionnaireId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questionnaire",
    required: true,
  },

  answers: {
    type: [answerSchema],
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PatientResponse", patientResponseSchema);


