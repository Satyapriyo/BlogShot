const { badRequestResponse } = require('../utils/response');

// Validation schemas for different routes
const validators = {
  post: {
    create: (req, res, next) => {
      const { title, desc, photo, username, catagories } = req.body;
      const errors = [];

      if (!title || typeof title !== 'string' || title.trim().length === 0) {
        errors.push('Title is required and must be a non-empty string');
      }
      if (title && title.length > 200) {
        errors.push('Title must be less than 200 characters');
      }

      if (!desc || typeof desc !== 'string' || desc.trim().length === 0) {
        errors.push('Description is required and must be a non-empty string');
      }
      if (desc && desc.length < 10) {
        errors.push('Description must be at least 10 characters');
      }

      if (!photo || typeof photo !== 'string') {
        errors.push('Photo URL is required');
      }

      if (!username || typeof username !== 'string') {
        errors.push('Username is required');
      }

      if (catagories && !Array.isArray(catagories)) {
        errors.push('Categories must be an array');
      }

      if (errors.length > 0) {
        return badRequestResponse(res, 'Validation failed', 'VALIDATION_ERROR', { errors });
      }

      next();
    },

    update: (req, res, next) => {
      const { title, desc, photo, username } = req.body;
      const errors = [];

      if (title && (typeof title !== 'string' || title.trim().length === 0)) {
        errors.push('Title must be a non-empty string');
      }
      if (title && title.length > 200) {
        errors.push('Title must be less than 200 characters');
      }

      if (desc && (typeof desc !== 'string' || desc.trim().length < 10)) {
        errors.push('Description must be at least 10 characters');
      }

      if (photo && typeof photo !== 'string') {
        errors.push('Photo must be a string');
      }

      if (!username) {
        errors.push('Username is required for update');
      }

      if (errors.length > 0) {
        return badRequestResponse(res, 'Validation failed', 'VALIDATION_ERROR', { errors });
      }

      next();
    },
  },

  comment: {
    create: (req, res, next) => {
      const { content, username, postId } = req.body;
      const errors = [];

      if (!content || typeof content !== 'string' || content.trim().length === 0) {
        errors.push('Comment content is required');
      }
      if (content && (content.length < 2 || content.length > 5000)) {
        errors.push('Comment must be between 2 and 5000 characters');
      }

      if (!username || typeof username !== 'string') {
        errors.push('Username is required');
      }

      if (!postId || typeof postId !== 'string') {
        errors.push('Post ID is required');
      }

      if (errors.length > 0) {
        return badRequestResponse(res, 'Validation failed', 'VALIDATION_ERROR', { errors });
      }

      next();
    },
  },

  user: {
    create: (req, res, next) => {
      const { username, email, password } = req.body;
      const errors = [];

      if (!username || typeof username !== 'string' || username.trim().length < 3) {
        errors.push('Username must be at least 3 characters');
      }
      if (username && username.length > 30) {
        errors.push('Username must be less than 30 characters');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        errors.push('Valid email is required');
      }

      if (!password || password.length < 6) {
        errors.push('Password must be at least 6 characters');
      }

      if (errors.length > 0) {
        return badRequestResponse(res, 'Validation failed', 'VALIDATION_ERROR', { errors });
      }

      next();
    },

    update: (req, res, next) => {
      const { username, email, password } = req.body;
      const errors = [];

      if (username && (typeof username !== 'string' || username.trim().length < 3)) {
        errors.push('Username must be at least 3 characters');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRegex.test(email)) {
        errors.push('Valid email is required');
      }

      if (password && password.length < 6) {
        errors.push('Password must be at least 6 characters');
      }

      if (errors.length > 0) {
        return badRequestResponse(res, 'Validation failed', 'VALIDATION_ERROR', { errors });
      }

      next();
    },
  },
};

module.exports = validators;
