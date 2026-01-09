import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";

export default function QuizList() {
  const { category } = useParams();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    api.get(`/quiz/${category}`).then(res => setQuizzes(res.data));
  }, [category]);

  if (!quizzes.length) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400">
        No quizzes found
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">
        {category} Quizzes
      </h1>

      {quizzes.map(q => (
        <div
          key={q._id}
          className="bg-white rounded-2xl shadow p-6 flex justify-between items-center"
        >
          <div>
            <h2 className="text-xl font-semibold">
              {q.title}
            </h2>
            <p className="text-gray-500">
              Time: {q.timeLimit}s
            </p>
          </div>

          <Link
            to={`/quiz/attempt/${q._id}`}
            className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-xl transition"
          >
            Start Quiz
          </Link>
        </div>
      ))}
    </div>
  );
}
