const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const { asyncHandler, AppError } = require("../middleware/errorHandler");
const { successResponse, createdResponse, serverErrorResponse } = require("../utils/response");
const logger = require("../middleware/logger");

// CREATE A NEW COMMENT
router.post("/", asyncHandler(async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const savedComment = await newComment.save();
    logger.info("Comment created successfully", { commentId: savedComment._id, postId: savedComment.postId });
    return createdResponse(res, savedComment, "Comment created successfully");
  } catch (err) {
    logger.error("Failed to create comment", { error: err.message });
    throw new AppError("Failed to create comment", 500, "CREATE_COMMENT_ERROR");
  }
}));

// GET ALL COMMENTS FOR A POST
router.get("/post/:postId", asyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .sort({ createdAt: -1 })
      .lean();
    
    logger.debug("Comments fetched", { postId: req.params.postId, count: comments.length });
    return successResponse(res, comments, "Comments retrieved successfully");
  } catch (err) {
    logger.error("Failed to fetch comments", { error: err.message, postId: req.params.postId });
    throw new AppError("Failed to fetch comments", 500, "FETCH_COMMENTS_ERROR");
  }
}));

// GET A SINGLE COMMENT
router.get("/:id", asyncHandler(async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).lean();
    if (!comment) {
      throw new AppError("Comment not found", 404, "COMMENT_NOT_FOUND");
    }
    return successResponse(res, comment, "Comment retrieved successfully");
  } catch (err) {
    logger.error("Failed to fetch comment", { error: err.message, commentId: req.params.id });
    if (err.message.includes("not found")) {
      throw new AppError("Comment not found", 404, "COMMENT_NOT_FOUND");
    }
    throw new AppError("Failed to fetch comment", 500, "FETCH_COMMENT_ERROR");
  }
}));

// UPDATE A COMMENT
router.put("/:id", asyncHandler(async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      throw new AppError("Comment not found", 404, "COMMENT_NOT_FOUND");
    }
    
    if (comment.username !== req.body.username) {
      throw new AppError("You can only update your own comments", 403, "FORBIDDEN");
    }
    
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    
    logger.info("Comment updated successfully", { commentId: req.params.id });
    return successResponse(res, updatedComment, "Comment updated successfully");
  } catch (err) {
    logger.error("Failed to update comment", { error: err.message, commentId: req.params.id });
    if (err.statusCode) throw err;
    throw new AppError("Failed to update comment", 500, "UPDATE_COMMENT_ERROR");
  }
}));

// DELETE A COMMENT
router.delete("/:id", asyncHandler(async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      throw new AppError("Comment not found", 404, "COMMENT_NOT_FOUND");
    }
    
    if (comment.username !== req.body.username) {
      throw new AppError("You can only delete your own comments", 403, "FORBIDDEN");
    }
    
    await Comment.findByIdAndDelete(req.params.id);
    logger.info("Comment deleted successfully", { commentId: req.params.id });
    return successResponse(res, null, "Comment deleted successfully");
  } catch (err) {
    logger.error("Failed to delete comment", { error: err.message, commentId: req.params.id });
    if (err.statusCode) throw err;
    throw new AppError("Failed to delete comment", 500, "DELETE_COMMENT_ERROR");
  }
}));

// LIKE A COMMENT
router.put("/:id/like", asyncHandler(async (req, res) => {
  try {
    // Check if comment exists first
    const existingComment = await Comment.findById(req.params.id);
    if (!existingComment) {
      throw new AppError("Comment not found", 404, "COMMENT_NOT_FOUND");
    }
    
    // Then increment likes
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    
    logger.debug("Comment liked", { commentId: req.params.id, newLikes: comment.likes });
    return successResponse(res, comment, "Comment liked successfully");
  } catch (err) {
    logger.error("Failed to like comment", { error: err.message, commentId: req.params.id });
    if (err.statusCode) throw err;
    throw new AppError("Failed to like comment", 500, "LIKE_COMMENT_ERROR");
  }
}));

module.exports = router;
