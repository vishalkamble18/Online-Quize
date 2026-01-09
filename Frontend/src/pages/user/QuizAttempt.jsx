import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function QuizAttempt() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const submittedRef = useRef(false);

  /* =========================
     FORMAT TIME (MM:SS)
  ========================= */
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  /* =========================
     LOAD QUESTIONS
     1 Question = 1 Minute
  ========================= */
  useEffect(() => {
    api.get(`/quiz/start/${quizId}`)
      .then(res => {
        const qs = res.data.questions || res.data;
        setQuestions(qs);

        // ✅ RULE APPLIED HERE
        const totalTime = qs.length * 60; // 10 Q = 600 sec
        setTimeLeft(totalTime);
        setStartTime(Date.now());
      })
      .catch(() => {
        alert("Quiz already attempted");
        navigate("/result");
      });
  }, [quizId, navigate]);

  /* =========================
     TIMER
  ========================= */
  useEffect(() => {
    if (timeLeft <= 0 && questions.length && !submittedRef.current) {
      alert("⏰ Time is over!");
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, questions]);

  /* =========================
     HANDLE ANSWERS
  ========================= */
  const handleChange = (qid, option) => {
    setAnswers(prev => ({ ...prev, [qid]: option }));
  };

  /* =========================
     SUBMIT QUIZ
  ========================= */
  const handleSubmit = async () => {
    if (submittedRef.current) return;
    submittedRef.current = true;

    try {
      const payload = Object.keys(answers).map(qid => ({
        questionId: qid,
        selectedOption: answers[qid]
      }));

      const timeTaken = Math.floor((Date.now() - startTime) / 1000);

      await api.post(`/result/submit/${quizId}`, {
        answers: payload,
        timeTaken,
        totalQuestions: questions.length
      });

      navigate("/result");
    } catch (err) {
      submittedRef.current = false;
      alert("Submit failed");
    }
  };

  /* =========================
     UI
  ========================= */
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* TIMER */}
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Quiz In Progress</h2>
          <span className={`font-bold ${timeLeft <= 60 ? "text-red-600" : "text-purple-700"}`}>
            ⏱ {formatTime(timeLeft)}
          </span>
        </div>

        {/* QUESTIONS */}
        {questions.map((q, index) => (
          <div key={q._id} className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-4">
              {index + 1}. {q.question}
            </h3>

            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <label key={i} className="flex gap-3 p-3 border rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name={q._id}
                    checked={answers[q._id] === i}
                    onChange={() => handleChange(q._id, i)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          className="w-full bg-purple-700 text-white py-3 rounded-xl font-semibold"
        >
          Submit Quiz
        </button>

      </div>
    </div>
  );
}
