import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

export default function Leaderboard() {
  const { quizId } = useParams();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    api
      .get(`/result/leaderboard/${quizId}`)
      .then(res => setLeaderboard(res.data))
      .catch(err => console.error(err));
  }, [quizId]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          🏆 Leaderboard
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="py-3">Rank</th>
              <th className="py-3">Name</th>
              <th className="py-3">Score</th>
              <th className="py-3">Time (sec)</th>
            </tr>
          </thead>

          <tbody>
            {leaderboard.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No attempts yet
                </td>
              </tr>
            )}

            {leaderboard.map((row, index) => (
              <tr key={row._id} className="text-center border-b">
                <td className="py-3 font-semibold">
                  #{index + 1}
                </td>

                {/* ✅ ADD THIS LINE HERE */}
                <td className="py-3">
                  {row.userId?.name || "Anonymous"}
                </td>

                <td className="py-3 font-bold text-green-600">
                  {row.score}
                </td>

                <td className="py-3">
                  {row.timeTaken}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
