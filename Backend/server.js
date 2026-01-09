require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(
  cors({
    origin: [
      "https://online-quize-mu.vercel.app",
      "https://online-quize-git-main-vishals-projects-a27808f4.vercel.app", // your Vercel frontend
      "http://localhost:5173"             // local dev
    ],
    credentials: true
  })
);
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/quiz", require("./routes/quizRoutes"));
app.use("/api/result", require("./routes/resultRoutes"));

app.get("/", (req, res) => {
  res.send("Quiz API running 🚀");
});

console.log(
  "🤖 OPENAI KEY:",
  process.env.OPENAI_API_KEY ? "LOADED" : "MISSING"
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);