export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Welcome back, Admin 👋
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a
          href="/admin/manage-quiz"
          className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold text-purple-700 mb-2">
            📚 Manage Quizzes
          </h3>
          <p className="text-gray-500">
            Create quizzes and manage questions
          </p>
        </a>

        <a
          href="/admin/users"
          className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold text-purple-700 mb-2">
            👥 Manage Users
          </h3>
          <p className="text-gray-500">
            View users and reset quiz attempts
          </p>
        </a>
      </div>
    </div>
  );
}
