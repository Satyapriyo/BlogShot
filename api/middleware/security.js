const mongoSanitize = require('express-mongo-sanitize');

// Security middleware setup
const securityMiddleware = [
  // Prevent NoSQL injection
  mongoSanitize({
    replaceWith: '_',
    onSanitize: ({ req, key }) => {
      console.warn(`Sanitized key: ${key}`);
    },
  }),

  // Sanitize user input middleware
  (req, res, next) => {
    if (req.body) {
      sanitizeObject(req.body);
    }
    if (req.query) {
      sanitizeObject(req.query);
    }
    if (req.params) {
      sanitizeObject(req.params);
    }
    next();
  },

  // Request size limit
  (req, res, next) => {
    const contentLength = req.get('content-length');
    if (contentLength && parseInt(contentLength) > 50 * 1024 * 1024) {
      // 50MB limit
      return res.status(413).json({
        success: false,
        message: 'Payload too large',
        errorCode: 'PAYLOAD_TOO_LARGE',
      });
    }
    next();
  },

  // Security headers
  (req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    next();
  },
];

// Sanitize object values (remove harmful characters)
function sanitizeObject(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      // Remove script tags and suspicious patterns
      obj[key] = obj[key]
        .replace(/<script[^>]*>.*?<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .trim();
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      sanitizeObject(obj[key]);
    }
  }
}

module.exports = { securityMiddleware, sanitizeObject };
