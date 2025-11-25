const express = require("express");
const router = express.Router();

const { addReview, getDoctorReviews } = require("../controllers/reviewController");

const authMiddleware = require("../middlewares/authMiddleware");

// Patient adds review
router.post("/", authMiddleware, addReview);

// Doctor reviews listing
router.get("/doctor/:doctorId", authMiddleware, getDoctorReviews);

module.exports = router;
