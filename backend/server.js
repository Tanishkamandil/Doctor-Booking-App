import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import "dotenv/config";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import adminRouter from "./routes/adminRouter.js";
import doctorRouter from "./routes/doctorRouter.js";
import userRouter from "./routes/userRouter.js";

// App config
const app = express();
const port = process.env.PORT || 4000;

// Database + Cloudinary
connectDB();
connectCloudinary();

// Security headers
app.use(helmet());

// Compress responses (improves speed)
app.use(compression());

// Request logging (for development)
app.use(morgan("dev"));

// CORS config
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

// Rate limiting (avoid DDOS / spam)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
});
app.use(limiter);

// Middleware to parse JSON
app.use(express.json());

// API routes
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

// Health check (for deployment)
app.get("/health", (req, res) => {
  res.json({ status: "UP" });
});

// Root route
app.get("/", (req, res) => {
  res.send("API working");
});

// Global error handler (important!)
app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
