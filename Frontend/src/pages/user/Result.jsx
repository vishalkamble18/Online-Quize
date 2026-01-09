import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Result() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  /* =========================
     LOAD RESULT
  ========================= */
  useEffect(() => {
    async function loadResult() {
      try {
        const res = await api.get("/result/my");
        setResult(res.data);
      } catch (err) {
        setError("Unable to load result");
      }
    }
    loadResult();
  }, []);

  /* =========================
     DOWNLOAD CERTIFICATE
  ========================= */
  const downloadCertificate = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/result/certificate/${result._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "certificate.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Certificate download failed");
    }
  };

  /* =========================
     STATES
  ========================= */
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading result...
      </div>
    );
  }

  /* =========================
     FIXES (IMPORTANT)
  ========================= */
  const score = Number(result.score) || 0;
  const total = Number(result.totalQuestions || result.total) || 0;

  const percentage =
    total > 0 ? Math.round((score / total) * 100) : 0;

  const minutes = Math.floor((result.timeTaken || 0) / 60);
  const seconds = (result.timeTaken || 0) % 60;

  /* =========================
     UI
  ========================= */
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8 space-y-6">

        <h1 className="text-3xl font-bold text-center text-purple-700">
          🎉 Quiz Result
        </h1>

        {/* SCORE */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-purple-50 rounded-xl p-4">
            <p className="text-gray-600">Score</p>
            <p className="text-2xl font-bold">
              {score} / {total}
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-4">
            <p className="text-gray-600">Percentage</p>
            <p className="text-2xl font-bold">
              {percentage}%
            </p>
          </div>
        </div>

        {/* STATUS */}
        <div className="text-center">
          <span
            className={`px-6 py-2 rounded-full text-white font-semibold ${
              result.status === "Passed"
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            {result.status}
          </span>
        </div>

        {/* TIME */}
        <div className="text-center text-gray-700">
          ⏱ Time Taken:{" "}
          <b>{minutes} min {seconds} sec</b>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <Link
            to="/review"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-center"
          >
            🔍 Review Answers
          </Link>

          <Link
            to={`/leaderboard/${result.quizId}`}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold text-center"
          >
            🏆 Leaderboard
          </Link>

          {result.status === "Passed" && (
            <button
              onClick={downloadCertificate}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              📜 Download Certificate
            </button>
          )}
        </div>

        {/* HOME */}
        <div className="text-center">
          <button
            onClick={() => navigate("/home")}
            className="text-purple-700 font-semibold hover:underline"
          >
            ← Back to Home
          </button>
        </div>

      </div>
    </div>
  );
}
