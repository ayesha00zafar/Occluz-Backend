const Review = require("../models/Review");

// Add a new review
exports.addReview = async (req, res) => {
  try {
    const { doctorId, rating, comment } = req.body;

    const review = await Review.create({
      doctorId,
      patientId: req.user.id,
      rating,
      comment,
    });

    return res.status(201).json({
      success: true,
      message: "Review submitted",
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding review",
      error: error.message,
    });
  }
};

// Get all reviews of a doctor
exports.getDoctorReviews = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const reviews = await Review.find({ doctorId }).populate("patientId", "name email");

    return res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
      error: error.message,
    });
  }
};
