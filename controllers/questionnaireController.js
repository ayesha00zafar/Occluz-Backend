const Questionnaire = require('../models/Questionnaire');

exports.getMyQuestionnaires = async (req, res) => {
  try {
    // req.user.id comes from your auth middleware
    const doctorId = req.user.id;

    const questionnaires = await Questionnaire.find({ doctorId });

    res.json({ success: true, questionnaires });
  } catch (error) {
    console.error(error);  // <-- add this to see the real error in your terminal
    res.status(500).json({
      success: false,
      message: 'Error fetching questionnaires',
      error: error.message || error
    });
  }
};
