// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children, role }) {
//   const token = localStorage.getItem("token");
//   const userRole = localStorage.getItem("role");

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   if (role && userRole !== role) {
//     return <Navigate to={userRole === "admin" ? "/admin" : "/home"} replace />;
//   }

//   return children;
// }



import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
