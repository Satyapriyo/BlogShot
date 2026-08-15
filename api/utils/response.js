// Standardized API response utility
class ApiResponse {
  constructor(statusCode, data, message = 'Success', errorCode = null) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.errorCode = errorCode;
    this.success = statusCode < 400;
  }
}

// Helper functions for common responses
const successResponse = (res, data = null, message = 'Success', statusCode = 200) => {
  const response = new ApiResponse(statusCode, data, message);
  return res.status(statusCode).json({
    success: response.success,
    statusCode: response.statusCode,
    message: response.message,
    data: response.data,
  });
};

const errorResponse = (res, statusCode = 500, message = 'Error', errorCode = null, data = null) => {
  const response = new ApiResponse(statusCode, data, message, errorCode);
  return res.status(statusCode).json({
    success: response.success,
    statusCode: response.statusCode,
    message: response.message,
    errorCode: response.errorCode,
    ...(data && { data }),
  });
};

const createdResponse = (res, data, message = 'Created successfully') => {
  return successResponse(res, data, message, 201);
};

const notFoundResponse = (res, message = 'Resource not found') => {
  return errorResponse(res, 404, message, 'NOT_FOUND');
};

const unauthorizedResponse = (res, message = 'Unauthorized') => {
  return errorResponse(res, 401, message, 'UNAUTHORIZED');
};

const forbiddenResponse = (res, message = 'Forbidden') => {
  return errorResponse(res, 403, message, 'FORBIDDEN');
};

const badRequestResponse = (res, message = 'Bad request', errorCode = 'BAD_REQUEST', data = null) => {
  return errorResponse(res, 400, message, errorCode, data);
};

const conflictResponse = (res, message = 'Conflict') => {
  return errorResponse(res, 409, message, 'CONFLICT');
};

const serverErrorResponse = (res, message = 'Internal server error') => {
  return errorResponse(res, 500, message, 'INTERNAL_ERROR');
};

module.exports = {
  ApiResponse,
  successResponse,
  errorResponse,
  createdResponse,
  notFoundResponse,
  unauthorizedResponse,
  forbiddenResponse,
  badRequestResponse,
  conflictResponse,
  serverErrorResponse,
};
