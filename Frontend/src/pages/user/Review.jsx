import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function Review() {
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReview() {
      try {
        // 1️⃣ GET USER RESULT
        const res = await api.get("/result/my");
        const result = res.data;

        setAnswers(result.answers);

        // 2️⃣ GET FULL QUESTIONS (WITH correctAnswer)
        const qRes = await api.get(
          `/quiz/${result.quizId}/questions`
        );
        setQuestions(qRes.data);
      } catch (err) {
        setError("Unable to load review");
      }
    }

    loadReview();
  }, []);

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        {error}
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Loading review...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">
        Review Answers
      </h1>

      {questions.map((q, index) => {
        const userAnswer = answers.find(
          a => a.questionId.toString() === q._id.toString()
        );

        return (
          <div
            key={q._id}
            className="bg-white rounded-2xl shadow p-6"
          >
            <h3 className="font-semibold mb-4">
              {index + 1}. {q.question}
            </h3>

            <ul className="space-y-2">
              {q.options.map((opt, i) => {
                const isSelected = i === userAnswer?.selectedOption;
                const isCorrect = i === q.correctAnswer;

                return (
                  <li
                    key={i}
                    className={`p-2 rounded-xl ${
                      isCorrect
                        ? "bg-green-100 text-green-700 font-semibold"
                        : isSelected
                        ? "bg-red-100 text-red-700 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {opt}
                    {isSelected && " (Your Answer)"}
                    {isCorrect && " ✅"}
                  </li>
                );
              })}
            </ul>

            <p className="mt-3 font-bold">
              {userAnswer?.selectedOption === q.correctAnswer
                ? "✅ Correct"
                : "❌ Wrong"}
            </p>
          </div>
        );
      })}

      <Link
        to="/home"
        className="inline-block text-purple-700 font-semibold hover:underline"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
