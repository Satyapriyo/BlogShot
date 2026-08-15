// Centralized error handling middleware
const logger = require('./logger');

class AppError extends Error {
  constructor(message, statusCode, errorCode = null) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.timestamp = new Date();

    Error.captureStackTrace(this, this.constructor);
  }
}

// Async handler wrapper to catch errors automatically
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Main error handling middleware
const errorHandler = (err, req, res, next) => {
  const error = { ...err };
  error.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Invalid ID format`;
    error.statusCode = 400;
    error.errorCode = 'INVALID_ID';
    logger.warn(`Cast error: ${message}`, { id: err.value });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    const message = `${field} already exists`;
    error.statusCode = 409;
    error.errorCode = 'DUPLICATE_ENTRY';
    logger.warn(`Duplicate entry: ${message}`, { field, value: err.keyValue[field] });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
    error.statusCode = 400;
    error.errorCode = 'VALIDATION_ERROR';
    logger.warn(`Validation error: ${message}`);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error.message = 'Invalid token';
    error.statusCode = 401;
    error.errorCode = 'INVALID_TOKEN';
  }

  if (err.name === 'TokenExpiredError') {
    error.message = 'Token expired';
    error.statusCode = 401;
    error.errorCode = 'TOKEN_EXPIRED';
  }

  error.statusCode = error.statusCode || 500;
  error.message = error.message || 'Internal Server Error';

  logger.error(`Error: ${error.message}`, {
    statusCode: error.statusCode,
    errorCode: error.errorCode,
    path: req.path,
    method: req.method,
    stack: err.stack,
  });

  res.status(error.statusCode).json({
    success: false,
    statusCode: error.statusCode,
    errorCode: error.errorCode,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = { AppError, asyncHandler, errorHandler };
