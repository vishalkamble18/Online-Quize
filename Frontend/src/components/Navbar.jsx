// import { Link, useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <nav className="flex justify-between items-center px-6 py-3 border-b">
//       <h1 className="text-xl font-bold">Quiz System</h1>

//       <div className="space-x-4">
//         {!token && (
//           <>
//             <Link to="/login">Login</Link>
//             <Link to="/register">Register</Link>
//           </>
//         )}

//         {token && role === "admin" && (
//           <Link
//             to="/admin"
//             className="font-semibold text-blue-600"
//           >
//             Admin Panel
//           </Link>
//         )}

//         {token && role === "user" && (
//           <Link to="/home">Home</Link>
//         )}

//         {token && (
//           <button
//             onClick={logout}
//             className="border px-3 py-1 rounded"
//           >
//             Logout
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }

import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    // localStorage.clear();
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-purple-700 tracking-tight">
          Quiz<span className="text-gray-800">Pro</span>
        </h1>
        <h3 className="text-lg font-medium text-gray-600 text-center">
          <span className="text-blue-600 font-semibold">Assess</span> your
          knowledge
          <span className="text-purple-600 font-semibold"> with </span>
          smart quizzes and real-time results
        </h3>

        <div className="flex items-center gap-4 text-sm font-medium">
          {!token && (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-purple-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-xl transition"
              >
                Register
              </Link>
            </>
          )}

          {token && role === "admin" && (
            <Link
              to="/admin"
              className="text-purple-700 font-semibold hover:underline"
            >
              Admin Panel
            </Link>
          )}

          {token && role === "user" && (
            <Link
              to="/home"
              className="text-gray-600 hover:text-purple-700 transition"
            >
              Home
            </Link>
          )}

          {token && (
            <button
              onClick={logout}
              className="border border-gray-300 px-4 py-2 rounded-xl hover:bg-gray-100 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
