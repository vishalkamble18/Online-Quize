// import { Link, Outlet, useNavigate } from "react-router-dom";

// export default function AdminLayout() {
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* SIDEBAR */}
//       <aside className="w-64 bg-gray-900 text-white p-5">
//         <h2 className="text-xl font-bold mb-6">
//           Admin Panel
//         </h2>

//         <nav className="space-y-4">
//           <Link
//             to="/admin"
//             className="block hover:text-yellow-400"
//           >
//             Dashboard
//           </Link>

//           <Link
//             to="/admin/manage-quiz"
//             className="block hover:text-yellow-400"
//           >
//             Manage Quizzes
//           </Link>

//           <Link
//             to="/admin/users"
//             className="block hover:text-yellow-400"
//           >
//             Manage Users
//           </Link>

//           <button
//             onClick={logout}
//             className="mt-6 bg-red-600 px-4 py-2 rounded"
//           >
//             Logout
//           </button>
//         </nav>
//       </aside>

//       {/* MAIN CONTENT */}
//       <main className="flex-1 p-8">
//         <Outlet />
//       </main>
//     </div>
//   );
// }


import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    // localStorage.clear();
    localStorage.removeItem("token");
  localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gradient-to-b from-purple-800 to-purple-900 text-white p-6 hidden md:flex flex-col">
        <h2 className="text-2xl font-bold mb-10">
          Admin Panel
        </h2>

        <nav className="flex-1 space-y-3 text-sm">
          <Link
            to="/admin"
            className="block px-4 py-2 rounded-lg hover:bg-white/10 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/manage-quiz"
            className="block px-4 py-2 rounded-lg hover:bg-white/10 transition"
          >
            Manage Quizzes
          </Link>

          <Link
            to="/admin/users"
            className="block px-4 py-2 rounded-lg hover:bg-white/10 transition"
          >
            Manage Users
          </Link>
        </nav>

        <button
          onClick={logout}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition"
        >
          Logout
        </button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
