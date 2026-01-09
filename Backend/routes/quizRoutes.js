const express = require("express");
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/* =========================
   GET CATEGORIES
========================= */
router.get("/categories", auth, async (req, res) => {
  const categories = await Quiz.distinct("category");
  res.json(categories);
});

/* =========================
   GET QUIZZES BY CATEGORY
========================= */
router.get("/:category", auth, async (req, res) => {
  const quizzes = await Quiz.find({ category: req.params.category });
  res.json(quizzes);
});

/* =========================
   START QUIZ (WITH TIMER)
========================= */
router.get("/start/:quizId", auth, async (req, res) => {
  try {
    const questions = await Question.find({
      quizId: req.params.quizId
    }).select("-correctAnswer");

    const quiz = await Quiz.findById(req.params.quizId);

    res.json({
      questions,
      timeLimit: quiz.timeLimit // ✅ seconds
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =========================
   GET ALL QUESTIONS (REVIEW)
========================= */
router.get("/:quizId/questions", auth, async (req, res) => {
  try {
    const questions = await Question.find({
      quizId: req.params.quizId
    });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
