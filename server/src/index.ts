import dotenv from "dotenv";
dotenv.config();
console.log("DB:", process.env.DATABASE_URL);

import express from "express";

const app = express();

app.use(express.json());   // Middleware to parse JSON bodies

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import submissionRoutes from "./routes/submission.routes";

app.use("/api/submissions", submissionRoutes);

import problemRoutes from "./routes/problem.routes";

app.use("/api/problems", problemRoutes);

import airoutes from "./routes/ai.routes";

app.use("/api/ai", airoutes);

import authRoutes from "./modules/auth/auth.routes";
app.use("/api/auth", authRoutes);

import "./queues/design.worker";