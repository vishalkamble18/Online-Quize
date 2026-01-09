import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
import api from "../services/api";

import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));

      navigate(user.role === "admin" ? "/admin" : "/home");
    } catch {
      alert("Invalid email or password");
    }
  };

  return (
    /* PAGE BACKGROUND IMAGE (CLEAR) */
    <div
      className="min-h-screen flex items-center justify-center px-4
                 bg-cover bg-center"
      style={{
        backgroundImage: "url('/page-bg.jpg')",
      }}
    >
      {/* LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-4xl bg-white/95
                   rounded-2xl shadow-xl
                   grid grid-cols-1 md:grid-cols-2 overflow-hidden"
      >
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="p-8 md:p-10"
        >
          <h2 className="text-3xl font-bold mb-2">Welcome Back 👋</h2>
          <p className="mb-6 text-gray-600">Login to continue</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl bg-gray-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl bg-gray-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-purple-700 text-white py-3 rounded-xl"
            >
              Login
            </motion.button>
          </form>

          <p className="text-sm mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-purple-700 font-semibold">
              Create Account
            </Link>
          </p>
        </motion.div>

        {/* RIGHT HERO */}
        <div className="hidden md:flex items-center justify-center bg-purple-700 text-white p-10">
          <div>
            <h3 className="text-4xl font-bold mb-4">Online Quiz Platform</h3>
            <p>Test your skills. Track progress.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
