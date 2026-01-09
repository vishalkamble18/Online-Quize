const express = require("express");
const Result = require("../models/Result");
const Question = require("../models/Question");
const auth = require("../middleware/authMiddleware");
const PDFDocument = require("pdfkit");

const router = express.Router();

/* ======================================
   SUBMIT QUIZ (FINAL FIXED VERSION)
====================================== */
router.post("/submit/:quizId", auth, async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers, timeTaken, totalQuestions } = req.body;

    if (!answers || timeTaken === undefined || !totalQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const questions = await Question.find({ quizId });
    let score = 0;

    const evaluatedAnswers = answers.map(ans => {
      const question = questions.find(
        q => q._id.toString() === ans.questionId
      );

      const isCorrect =
        question && question.correctAnswer === ans.selectedOption;

      if (isCorrect) score++;

      return {
        questionId: ans.questionId,
        selectedOption: ans.selectedOption,
        isCorrect
      };
    });

    const result = await Result.create({
      userId: req.user.id,
      quizId,
      score,
      total: totalQuestions,
      totalQuestions,        
      timeTaken,             
      answers: evaluatedAnswers,
      status: score >= totalQuestions / 2 ? "Passed" : "Failed"
    });

    res.status(201).json(result);
  } catch (error) {
    console.error("SUBMIT ERROR:", error);
    res.status(500).json({ message: "Submit failed" });
  }
});

/* ======================================
   GET MY RESULT
====================================== */
router.get("/my", auth, async (req, res) => {
  try {
    const result = await Result.findOne({ userId: req.user.id })
      .sort({ createdAt: -1 });

    if (!result) {
      return res.status(404).json({ message: "No result found" });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to load result" });
  }
});

/* ======================================
   LEADERBOARD
====================================== */
router.get("/leaderboard/:quizId", auth, async (req, res) => {
  try {
    const results = await Result.find({ quizId: req.params.quizId })
      .populate("userId", "name email")
      .sort({ score: -1, timeTaken: 1 });

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ======================================
   GENERATE CERTIFICATE PDF (FINAL FIX)
====================================== */
router.get("/certificate/:resultId", auth, async (req, res) => {
  try {
    const result = await Result.findById(req.params.resultId)
      .populate("userId", "name")
      .populate("quizId", "title");

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    if (result.status !== "Passed") {
      return res
        .status(403)
        .json({ message: "Certificate only for passed users" });
    }

    const total = result.totalQuestions; 

    const doc = new PDFDocument({ size: "A4", margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=certificate-${result.userId.name}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(28).text("Certificate of Achievement", { align: "center" });
    doc.moveDown(2);

    doc.fontSize(18).text("This is to certify that", { align: "center" });
    doc.moveDown(1);

    doc.fontSize(24).text(result.userId.name, {
      align: "center",
      underline: true
    });

    doc.moveDown(1);
    doc.fontSize(18).text("has successfully passed the quiz", {
      align: "center"
    });

    doc.moveDown(1);
    doc.fontSize(22).text(result.quizId.title, {
      align: "center",
      bold: true
    });

    doc.moveDown(2);

    
    doc.fontSize(16).text(
      `Score: ${result.score} / ${total}`,
      { align: "center" }
    );

    doc.moveDown(1);
    doc.fontSize(12).text(
      `Date: ${new Date(result.createdAt).toDateString()}`,
      { align: "center" }
    );

    doc.moveDown(3);
    doc.text("Authorized Signature", { align: "right" });

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Certificate generation failed" });
  }
});

module.exports = router;
