const { tooManyRequestsResponse } = require('../utils/response');

// In-memory store for rate limiting (use Redis in production)
const requestCounts = new Map();

const CLEANUP_INTERVAL = 60 * 1000; // Cleanup every minute

// Cleanup old entries
setInterval(() => {
  const now = Date.now();
  for (const [key, { timestamp }] of requestCounts.entries()) {
    if (now - timestamp > 60 * 1000) {
      requestCounts.delete(key);
    }
  }
}, CLEANUP_INTERVAL);

// Rate limiting middleware
const createRateLimiter = (options = {}) => {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes
    maxRequests = 100,
    keyGenerator = (req) => req.ip,
    skipSuccessfulRequests = false,
    skipFailedRequests = false,
  } = options;

  return (req, res, next) => {
    const key = keyGenerator(req);
    const now = Date.now();

    if (!requestCounts.has(key)) {
      requestCounts.set(key, { count: 1, timestamp: now });
      return next();
    }

    const { count, timestamp } = requestCounts.get(key);

    if (now - timestamp > windowMs) {
      requestCounts.set(key, { count: 1, timestamp: now });
      return next();
    }

    if (count >= maxRequests) {
      const retryAfter = Math.ceil((timestamp + windowMs - now) / 1000);
      res.set('Retry-After', retryAfter);

      return res.status(429).json({
        success: false,
        statusCode: 429,
        message: 'Too many requests, please try again later',
        errorCode: 'RATE_LIMIT_EXCEEDED',
        retryAfter,
      });
    }

    requestCounts.set(key, { count: count + 1, timestamp });
    next();
  };
};

// Specific limiters for different endpoints
const limiters = {
  // General API limiter: 100 requests per 15 minutes
  general: createRateLimiter({
    windowMs: 15 * 60 * 1000,
    maxRequests: 100,
  }),

  // Authentication limiter: 5 attempts per 15 minutes
  auth: createRateLimiter({
    windowMs: 15 * 60 * 1000,
    maxRequests: 5,
  }),

  // Post creation limiter: 10 posts per hour
  createPost: createRateLimiter({
    windowMs: 60 * 60 * 1000,
    maxRequests: 10,
  }),

  // Comment limiter: 30 comments per hour
  createComment: createRateLimiter({
    windowMs: 60 * 60 * 1000,
    maxRequests: 30,
  }),

  // Search limiter: 50 searches per minute
  search: createRateLimiter({
    windowMs: 60 * 1000,
    maxRequests: 50,
  }),

  // Strict limiter for sensitive operations: 5 per hour
  strict: createRateLimiter({
    windowMs: 60 * 60 * 1000,
    maxRequests: 5,
  }),
};

module.exports = { createRateLimiter, limiters };
