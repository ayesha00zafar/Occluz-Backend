const Questionnaire = require('../models/Questionnaire');

exports.createQuestionnaire = async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    const questionnaire = new Questionnaire({
      doctorId: req.user.id,
      title,
      description,
      questions
    });

    await questionnaire.save();
    res.status(201).json({
      message: "Questionnaire created successfully",
      questionnaire
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating questionnaire", error });
  }
};

exports.getDoctorQuestionnaires = async (req, res) => {
  try {
    const questionnaires = await Questionnaire.find({ doctorId: req.user.id });

    res.status(200).json({
      message: "Doctor questionnaires fetched",
      questionnaires
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching questionnaires", error });
  }
};


exports.updateQuestionnaire = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Questionnaire.findOneAndUpdate(
      { _id: id, doctorId: req.user.id },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Questionnaire not found or unauthorized" });
    }

    res.status(200).json({
      message: "Questionnaire updated successfully",
      questionnaire: updated
    });

  } catch (error) {
    res.status(500).json({ message: "Error updating questionnaire", error });
  }
};

exports.deleteQuestionnaire = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Questionnaire.findOneAndDelete({
      _id: id,
      doctorId: req.user.id
    });

    if (!deleted) {
      return res.status(404).json({ message: "Questionnaire not found or unauthorized" });
    }

    res.status(200).json({ message: "Questionnaire deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting questionnaire", error });
  }
};
