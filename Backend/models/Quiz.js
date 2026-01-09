const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },

    totalQuestions: {
      type: Number,
      default: 10
    },

    mode: {
      type: String,
      enum: ["MANUAL", "AI"],
      default: "MANUAL"
    },

    timeLimit: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
