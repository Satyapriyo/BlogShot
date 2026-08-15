const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const { asyncHandler, AppError } = require("../middleware/errorHandler");
const { successResponse, createdResponse, notFoundResponse, forbiddenResponse, serverErrorResponse } = require("../utils/response");
const validators = require("../middleware/validators");
const logger = require("../middleware/logger");

// CREATE NEW POST
router.post("/", validators.post.create, asyncHandler(async (req, res) => {
  const newPost = new Post(req.body);
  
  try {
    const savePost = await newPost.save();
    logger.info("Post created successfully", { postId: savePost._id, username: savePost.username });
    return createdResponse(res, savePost, "Post created successfully");
  } catch (err) {
    logger.error("Failed to create post", { error: err.message });
    throw new AppError("Failed to create post", 500, "CREATE_POST_ERROR");
  }
}));

// SEARCH POSTS WITH TITLE - MUST BE BEFORE /:id ROUTE
router.get("/search", asyncHandler(async (req, res) => {
  const query = req.query.q;
  
  if (!query || query.trim().length < 2) {
    return successResponse(res, [], "Please provide a valid search query");
  }

  try {
    const posts = await Post.find(
      { title: { $regex: query, $options: "i" } },
      { title: 1, username: 1, likes: 1, views: 1, createdAt: 1, photo: 1 } // Select only needed fields
    )
      .limit(20)
      .lean(); // Use lean for better performance
    
    logger.info("Search query executed", { query, resultCount: posts.length });
    return successResponse(res, posts, "Search results");
  } catch (err) {
    logger.error("Search failed", { error: err.message, query });
    throw new AppError("Search failed", 500, "SEARCH_ERROR");
  }
}));

// GET ALL POSTS WITH PAGINATION AND FILTERS
router.get("/", asyncHandler(async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  const searchQuery = req.query.search;
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit) || 10, 100); // Cap at 100
  const sortBy = req.query.sort || "newest";

  try {
    let query = {};

    if (username) {
      query.username = username;
    } else if (catName) {
      query.catagories = { $in: [catName] };
    } else if (searchQuery) {
      query.title = { $regex: searchQuery, $options: "i" };
    }

    // Determine sort order
    let sortObj = { createdAt: -1 };
    if (sortBy === "oldest") {
      sortObj = { createdAt: 1 };
    } else if (sortBy === "trending") {
      sortObj = { likes: -1, views: -1 };
    } else if (sortBy === "popular") {
      sortObj = { views: -1 };
    }

    const skip = (page - 1) * limit;

    const posts = await Post.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .lean(); // Use lean for better performance

    const totalPosts = await Post.countDocuments(query);
    const totalPages = Math.ceil(totalPosts / limit);

    logger.debug("Posts fetched", { 
      filters: { username, catName, searchQuery }, 
      page, 
      limit, 
      totalPosts 
    });

    return successResponse(res, {
      posts,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts,
        postsPerPage: limit,
      },
    }, "Posts retrieved successfully");
  } catch (err) {
    logger.error("Failed to fetch posts", { error: err.message });
    throw new AppError("Failed to fetch posts", 500, "FETCH_POSTS_ERROR");
  }
}));

//GET SINGLE POST (with view tracking) - MUST BE AFTER /search and /
router.get("/:id", asyncHandler(async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } }, // Increment view count atomically
      { new: true }
    );

    if (!post) {
      return notFoundResponse(res, "Post not found");
    }

    logger.debug("Post viewed", { postId: req.params.id });
    return successResponse(res, post, "Post retrieved successfully");
  } catch (err) {
    logger.error("Failed to fetch post", { error: err.message, postId: req.params.id });
    throw new AppError("Failed to fetch post", 500, "FETCH_POST_ERROR");
  }
}));

//UPDATE POST
router.put("/:id", validators.post.update, asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return notFoundResponse(res, "Post not found");
    }

    if (post.username !== req.body.username) {
      return forbiddenResponse(res, "You can only update your own posts");
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    logger.info("Post updated", { postId: req.params.id, username: post.username });
    return successResponse(res, updatedPost, "Post updated successfully");
  } catch (err) {
    logger.error("Failed to update post", { error: err.message, postId: req.params.id });
    throw new AppError("Failed to update post", 500, "UPDATE_POST_ERROR");
  }
}));

//ADD LIKES
router.put("/:id/like", asyncHandler(async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } }, // Use atomic increment
      { new: true }
    );

    if (!post) {
      return notFoundResponse(res, "Post not found");
    }

    logger.debug("Post liked", { postId: req.params.id, newLikes: post.likes });
    return successResponse(res, post, "Post liked successfully");
  } catch (err) {
    logger.error("Failed to like post", { error: err.message, postId: req.params.id });
    throw new AppError("Failed to like post", 500, "LIKE_POST_ERROR");
  }
}));

//DELETE POST
router.delete("/:id", asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return notFoundResponse(res, "Post not found");
    }

    if (post.username !== req.body.username) {
      return forbiddenResponse(res, "You can only delete your own posts");
    }

    await Post.findByIdAndDelete(req.params.id);

    logger.info("Post deleted", { postId: req.params.id, username: post.username });
    return successResponse(res, null, "Post deleted successfully");
  } catch (err) {
    logger.error("Failed to delete post", { error: err.message, postId: req.params.id });
    throw new AppError("Failed to delete post", 500, "DELETE_POST_ERROR");
  }
}));

module.exports = router;
