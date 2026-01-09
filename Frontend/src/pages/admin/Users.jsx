import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/admin/users").then(res => setUsers(res.data));
  }, []);

  const resetAttempt = async (userId, quizId) => {
    await api.delete(`/admin/reset-attempt/${userId}/${quizId}`);
    alert("Quiz attempt reset");
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">
        Users
      </h2>

      <div className="space-y-3">
        {users.map(user => (
          <div
            key={user._id}
            className="border rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">
                {user.email}
              </p>
              <p className="text-sm text-gray-500">
                Role: {user.role}
              </p>
            </div>

            <button
              onClick={() =>
                resetAttempt(user._id, user.lastQuizId)
              }
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
            >
              Reset Attempt
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
