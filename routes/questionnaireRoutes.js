const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const { getMyQuestionnaires } = require("../controllers/questionnaireController");

// Doctor: Get all questionnaires created by them
router.get("/my", auth, role("doctor"), getMyQuestionnaires);

module.exports = router;
