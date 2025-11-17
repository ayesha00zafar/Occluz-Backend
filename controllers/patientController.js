const PatientResponse = require('../models/PatientResponse');
const TreatmentPlan = require('../models/TreatmentPlan');
const Questionnaire = require('../models/Questionnaire');

// Fetch questionnaires assigned to the patient
exports.getMyQuestionnaires = async (req, res) => {
  try {
    const questionnaires = await Questionnaire.find({ doctorId: req.user.id }); // if assigned by doctor
    res.json(questionnaires);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching questionnaires', error });
  }
};

// Submit questionnaire answers
exports.submitQuestionnaire = async (req, res) => {
  try {
    const { id } = req.params;
    const answers = req.body.answers; // [{questionId: "...", answer: "..."}]

    const existingResponse = await PatientResponse.findOne({ patientId: req.user.id, questionnaireId: id });

    const response = existingResponse || new PatientResponse({ patientId: req.user.id, questionnaireId: id });

    response.answers = answers;
    await response.save();

    // Generate treatment plan (placeholder, can integrate AI logic here)
    const treatmentPlan = new TreatmentPlan({
      patientId: req.user.id,
      createdFrom: response._id,
      steps: answers.map(a => ({ description: `Step based on: ${a.answer}` })),
      progress: 0
    });
    await treatmentPlan.save();

    res.json({ success: true, message: 'Questionnaire submitted, treatment plan created', treatmentPlan });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Error submitting questionnaire', error });
  }
};

// Fetch latest treatment plan
exports.getTreatmentPlan = async (req, res) => {
  try {
    const plan = await TreatmentPlan.findOne({ patientId: req.user.id }).sort({ createdAt: -1 });
    if (!plan) return res.status(404).json({ success: false, message: 'No treatment plan found' });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching treatment plan', error });
  }
};
