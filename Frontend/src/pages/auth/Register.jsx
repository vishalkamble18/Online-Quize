import { useState } from "react";
import api from "../../services/api";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`${API}/auth/register`,form);
      alert("Account created successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    /* PAGE BACKGROUND IMAGE (WHITE SPACE AREA) */
    <div
      className="min-h-screen flex items-center justify-center px-4
                 bg-cover bg-center"
      style={{
        backgroundImage: "url('/page-bg.jpg')",
      }}
    >
      {/* REGISTER CARD */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl
                   bg-white dark:bg-gray-800
                   rounded-2xl shadow-xl
                   grid grid-cols-1 md:grid-cols-2
                   overflow-hidden"
      >
        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="p-8 md:p-10 flex flex-col justify-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Create Account 🚀
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Join and start taking quizzes today
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Full name"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl
                         bg-gray-100 dark:bg-gray-700
                         border border-gray-200 dark:border-gray-600
                         focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email address"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl
                         bg-gray-100 dark:bg-gray-700
                         border border-gray-200 dark:border-gray-600
                         focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl
                         bg-gray-100 dark:bg-gray-700
                         border border-gray-200 dark:border-gray-600
                         focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />

            {/* ROLE */}
            <div className="flex gap-6 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={form.role === "user"}
                  onChange={handleChange}
                />
                User
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={form.role === "admin"}
                  onChange={handleChange}
                />
                Admin
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-800
                         text-white font-semibold py-3 rounded-xl transition"
            >
              Create Account
            </motion.button>
          </form>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-700 dark:text-purple-400
                         font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </motion.div>

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="hidden md:flex items-center justify-center
                     bg-gradient-to-br from-purple-700 to-purple-900
                     text-white p-10"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            <motion.h3
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-4xl font-bold mb-4"
            >
              Smart Quiz Experience
            </motion.h3>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-purple-100 text-lg mb-4"
            >
              Practice. Compete. Improve.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="space-y-2 text-sm"
            >
              ✔ Real-time results <br />
              ✔ Role-based access <br />
              ✔ Secure & fast
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
