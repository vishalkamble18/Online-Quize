const express = require("express");
const Question = require("../models/Question");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/* =========================
   GET QUESTIONS BY QUIZ
========================= */
router.get("/:quizId", auth, async (req, res) => {
  try {
    const questions = await Question.find({
      quizId: req.params.quizId
    });

    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Failed to load questions" });
  }
});

/* =========================
   ADD QUESTION (MANUAL)
========================= */
router.post("/", auth, async (req, res) => {
  try {
    const { quizId, question, options, correctAnswer } = req.body;

    const q = await Question.create({
      quizId,
      question,
      options,
      correctAnswer
    });

    res.status(201).json(q);
  } catch (err) {
    res.status(500).json({ message: "Failed to add question" });
  }
});

module.exports = router;
