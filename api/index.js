const express = require("express");
const app = express();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const path = require("path");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const multer = require("multer");

// Import middleware and utilities
const { errorHandler, asyncHandler, AppError } = require("./middleware/errorHandler");
const { securityMiddleware } = require("./middleware/security");
const { limiters } = require("./middleware/rateLimiter");
const logger = require("./middleware/logger");

// Import routes
const authRouter = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");
const bookmarkRoute = require("./routes/bookmarks");
const catagoriesRoute = require("./routes/catagories");

require("dotenv").config();

// Environment variables
const PORT = process.env.PORT || 3003;
const MONGO_URL = process.env.MONGO_URL;
const CORS_URL = process.env.CORS_URL;
const NODE_ENV = process.env.NODE_ENV || "development";

// Trust proxy for rate limiting
app.set('trust proxy', 1);

// Security middleware - MUST be first
app.use(helmet());
app.use(...securityMiddleware);

// CORS configuration
const corsOptions = {
  origin: CORS_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Body parser with size limits
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// Rate limiting - Apply after body parser
app.use("/api/", limiters.general);
app.use("/api/post/", limiters.general);
app.use("/api/comments/", limiters.createComment);
app.use("/api/auth/", limiters.auth);

// Initialize Passport
app.use(passport.initialize());

// Passport Serialization
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Static files
app.use("/images", express.static(path.join(__dirname, "/images")));

// MongoDB Connection
mongoose
  .connect(MONGO_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    logger.info("Connected to MongoDB successfully");
  })
  .catch((err) => {
    logger.error("MongoDB connection failed", { error: err.message });
    process.exit(1);
  });

// Monitor MongoDB connection
mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  logger.error('MongoDB error', { error: err.message });
});

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// File upload endpoint with validation
app.post("/api/upload", upload.single("file"), asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError('No file uploaded', 400, 'NO_FILE');
  }
  res.status(200).json({
    success: true,
    message: 'File uploaded successfully',
    filename: req.file.filename,
  });
}));

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comments", commentRoute);
app.use("/api/bookmarks", bookmarkRoute);
app.use("/api/catagories", catagoriesRoute);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "BlogShot API is running",
    version: "1.0.0",
    environment: NODE_ENV,
  });
});

// 404 handler
app.use((req, res, next) => {
  const error = new AppError(
    `Route ${req.method} ${req.path} not found`,
    404,
    'NOT_FOUND'
  );
  next(error);
});

// Global error handling middleware - MUST be last
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

process.on('UNHANDLEDREJECTION', (err) => {
  logger.error('Unhandled rejection', { error: err.message });
  process.exit(1);
});

// Start server
const server = app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`, { 
    environment: NODE_ENV,
    port: PORT 
  });
});

module.exports = app;
