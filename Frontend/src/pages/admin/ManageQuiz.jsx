import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function ManageQuiz() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [mode, setMode] = useState("MANUAL");
  const [loading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState([]);

  const navigate = useNavigate();

  /* ================= LOAD QUIZZES ================= */
  const loadQuizzes = async () => {
    try {
      const res = await api.get("/admin/quizzes");
      setQuizzes(res.data);
    } catch (err) {
      console.error("LOAD QUIZ ERROR", err);
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  /* ================= CREATE QUIZ ================= */
  const createQuiz = async () => {
    if (!title || !category) {
      alert("Fill all fields");
      return;
    }

    try {
      setLoading(true);

      await api.post("/admin/quiz", {
        title,
        category,
        totalQuestions,
        mode
      });

      alert("Quiz created successfully ✅");
      setTitle("");
      setCategory("");
      setMode("MANUAL");
      loadQuizzes();
    } catch {
      alert("Quiz creation failed ❌");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE QUIZ ================= */
  const deleteQuiz = async (quizId) => {
    if (!window.confirm("Delete this quiz and all its questions?")) return;

    try {
      await api.delete(`/admin/quiz/${quizId}`);
      loadQuizzes();
    } catch {
      alert("Failed to delete quiz");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Manage Quizzes</h1>

      {/* CREATE QUIZ */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <input
          placeholder="Title"
          className="border p-2 w-full"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          placeholder="Category"
          className="border p-2 w-full"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />

        <input
          type="number"
          className="border p-2 w-full"
          value={totalQuestions}
          onChange={e => setTotalQuestions(e.target.value)}
        />

        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              checked={mode === "MANUAL"}
              onChange={() => setMode("MANUAL")}
            /> Manual
          </label>

          <label>
            <input
              type="radio"
              checked={mode === "AI"}
              onChange={() => setMode("AI")}
            /> AI
          </label>
        </div>

        <button
          onClick={createQuiz}
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-2 rounded"
        >
          {loading ? "Creating..." : "Create Quiz"}
        </button>
      </div>

      {/* QUIZ LIST */}
      <div
  className="space-y-3 overflow-y-auto"
  style={{ maxHeight: "420px" }}
>
  {quizzes.map(q => (
    <div
      key={q._id}
      className="bg-white border rounded-xl p-4 flex justify-between items-center"
    >
      <div>
        <h3 className="font-bold">{q.title}</h3>
        <p className="text-sm text-gray-600">
          {q.category} • {q.mode}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => navigate(`/admin/questions/${q._id}`)}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Manage Questions
        </button>

        <button
          onClick={() => deleteQuiz(q._id)}
          className="bg-red-600 text-white px-4 py-1 rounded"
        >
          Delete Quiz
        </button>
      </div>
    </div>
        ))}
      </div>
    </div>
  );
}

