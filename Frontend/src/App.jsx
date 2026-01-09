import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* AUTH */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* USER */
import Categories from "./pages/user/Categories";
import QuizList from "./pages/user/QuizList";
import QuizAttempt from "./pages/user/QuizAttempt";
import Result from "./pages/user/Result";
import Review from "./pages/user/Review";
import Leaderboard from "./pages/user/Leaderboard";

/* ADMIN */
import Dashboard from "./pages/admin/Dashboard";
import ManageQuiz from "./pages/admin/ManageQuiz";
import ManageQuestions from "./pages/admin/ManageQuestions";
import Users from "./pages/admin/Users";

/* COMPONENTS */
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import AdminLayout from "./components/AdminLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER ROUTES */}
        <Route
          path="/home"
          element={
            <ProtectedRoute role="user">
              <Categories />
            </ProtectedRoute>
          }
        />

        {/* ✅ FIX 1: CATEGORY ROUTE */}
        <Route
          path="/quiz/category/:category"
          element={
            <ProtectedRoute role="user">
              <QuizList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz/attempt/:quizId"
          element={
            <ProtectedRoute role="user">
              <QuizAttempt />
            </ProtectedRoute>
          }
        />

        <Route
          path="/result"
          element={
            <ProtectedRoute role="user">
              <Result />
            </ProtectedRoute>
          }
        />

        {/* ✅ FIX 2: REVIEW ROUTE */}
        <Route
          path="/review"
          element={
            <ProtectedRoute role="user">
              <Review />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leaderboard/:quizId"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES (NESTED) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="manage-quiz" element={<ManageQuiz />} />
          <Route path="questions/:quizId" element={<ManageQuestions />} />
          <Route path="users" element={<Users />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
