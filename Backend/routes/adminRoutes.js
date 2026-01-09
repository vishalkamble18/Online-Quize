const express = require("express");
const mongoose = require("mongoose");

const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const Result = require("../models/Result");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const generateAIQuestions = require("../utils/aiQuestions");

const router = express.Router();

/* ===============================
   CREATE QUIZ (MANUAL / AI)
================================ */
router.post("/quiz", auth, admin, async (req, res) => {
  try {
    const { title, category, totalQuestions, mode } = req.body;

    if (!title || !category) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // 1️⃣ CREATE QUIZ
    const quiz = await Quiz.create({
      title,
      category,
      totalQuestions,
      mode
    });

    // 2️⃣ AI MODE → GENERATE QUESTIONS
    if (mode === "AI") {
      console.log("🤖 AI MODE ENABLED");

      const aiQuestions = await generateAIQuestions(
        category,
        totalQuestions
      );

      if (!aiQuestions.length) {
        return res.status(500).json({
          message: "AI failed to generate questions"
        });
      }

      const formattedQuestions = aiQuestions.map(q => ({
        quizId: quiz._id,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer
      }));

      await Question.insertMany(formattedQuestions);

      console.log("✅ AI QUESTIONS SAVED:", formattedQuestions.length);
    }

    res.status(201).json({
      message: "Quiz created successfully",
      quiz
    });

  } catch (err) {
    console.error("❌ QUIZ CREATE ERROR:", err);
    res.status(500).json({ message: "Quiz creation failed" });
  }
});

module.exports = router;

/* =========================
   GET ALL QUIZZES
========================= */
router.get("/quizzes", auth, admin, async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
});

/* =========================
   GET QUESTIONS BY QUIZ
========================= */
router.get("/questions/:quizId", auth, admin, async (req, res) => {
  const questions = await Question.find({ quizId: req.params.quizId });
  res.json(questions);
});

/* =========================
   ADD QUESTION (MANUAL)
========================= */
router.post("/question/:quizId", auth, admin, async (req, res) => {
  const { question, options, correctAnswer } = req.body;

  const q = await Question.create({
    quizId: req.params.quizId,
    question,
    options,
    correctAnswer
  });

  res.status(201).json(q);
});

/* =========================
   DELETE QUESTION ✅
========================= */
router.delete("/question/:id", auth, admin, async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  res.json({ message: "Question deleted" });
});

/* ================= DELETE QUIZ (MANUAL + AI) ================= */
router.delete("/quiz/:id", auth, admin, async (req, res) => {
  try {
    const quizId = req.params.id;

    // ✅ DELETE QUESTIONS FIRST
    await Question.deleteMany({ quizId });

    // ✅ DELETE QUIZ
    await Quiz.findByIdAndDelete(quizId);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});


module.exports = router;












