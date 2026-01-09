const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true
    },

    score: {
      type: Number,
      required: true
    },

    totalQuestions: {
      type: Number,
      required: true
    },

    timeTaken: {
      type: Number, // seconds
      required: true
    },

    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question"
        },
        selectedOption: Number,
        isCorrect: Boolean
      }
    ],

    status: {
      type: String,
      enum: ["Passed", "Failed"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);
