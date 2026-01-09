import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

export default function ManageQuestions() {
  const { quizId } = useParams();

  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [loading, setLoading] = useState(false);

  /* ================= LOAD QUESTIONS ================= */
  const loadQuestions = async () => {
    try {
      const res = await api.get(`/admin/questions/${quizId}`);
      setQuestions(res.data);
    } catch {
      alert("Failed to load questions");
    }
  };

  useEffect(() => {
    loadQuestions();
  }, [quizId]);

  /* ================= ADD QUESTION ================= */
  const addQuestion = async () => {
    if (!question || options.some(o => !o)) {
      alert("Fill all fields");
      return;
    }

    try {
      setLoading(true);

      await api.post(`/admin/question/${quizId}`, {
        question,
        options,
        correctAnswer
      });

      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer(0);
      loadQuestions();
    } catch {
      alert("Failed to add question");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE QUESTION ================= */
  const deleteQuestion = async (id) => {
    if (!window.confirm("Delete this question?")) return;

    await api.delete(`/admin/question/${id}`);
    loadQuestions();
  };

  /* ================= UI ================= */
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Manage Questions</h1>

      {/* ADD QUESTION FORM */}
      <div className="bg-white p-6 rounded shadow space-y-3">
        <input
          className="border p-2 w-full"
          placeholder="Question"
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />

        {options.map((opt, i) => (
          <input
            key={i}
            className="border p-2 w-full"
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={e => {
              const copy = [...options];
              copy[i] = e.target.value;
              setOptions(copy);
            }}
          />
        ))}

        <select
          className="border p-2 w-full"
          value={correctAnswer}
          onChange={e => setCorrectAnswer(Number(e.target.value))}
        >
          <option value={0}>Correct Answer: Option 1</option>
          <option value={1}>Correct Answer: Option 2</option>
          <option value={2}>Correct Answer: Option 3</option>
          <option value={3}>Correct Answer: Option 4</option>
        </select>

        <button
          onClick={addQuestion}
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-2 rounded"
        >
          {loading ? "Adding..." : "Add Question"}
        </button>
      </div>

      {/* QUESTION LIST */}
      {questions.map((q, i) => (
        <div
          key={q._id}
          className="border rounded p-4 flex justify-between items-start"
        >
          <div>
            <p className="font-semibold">
              {i + 1}. {q.question}
            </p>
            <ul className="ml-5 list-disc">
              {q.options.map((opt, idx) => (
                <li
                  key={idx}
                  className={
                    idx === q.correctAnswer
                      ? "font-bold text-green-600"
                      : ""
                  }
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => deleteQuestion(q._id)}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
