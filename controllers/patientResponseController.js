const PatientResponse = require("../models/PatientResponse");

exports.submitResponse = async (req, res) => {
  try {
    const { questionnaireId, answers } = req.body;

    const response = await PatientResponse.create({
      patientId: req.user.id,
      questionnaireId,
      answers,
    });

    res.status(201).json({
      success: true,
      message: "Response submitted",
      response,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getResponsesByPatient = async (req, res) => {
  try {
    const responses = await PatientResponse.find({
      patientId: req.params.patientId,
    }).populate("questionnaireId");

    res.status(200).json({
      success: true,
      count: responses.length,
      responses,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSingleResponse = async (req, res) => {
  try {
    const response = await PatientResponse.findById(req.params.id).populate(
      "questionnaireId"
    );

    if (!response)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({
      success: true,
      response,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

