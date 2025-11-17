const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['text', 'yes_no', 'mcq'], 
    required: true 
  },
  options: {
    type: [String],
    default: []
  },
  required: { type: Boolean, default: true }
});

const questionnaireSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: { type: String, required: true },
  description: { type: String },
  questions: [questionSchema],
}, { timestamps: true });

module.exports = mongoose.model('Questionnaire', questionnaireSchema);
