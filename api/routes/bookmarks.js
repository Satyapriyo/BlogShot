const express = require("express");
const router = express.Router();
const Bookmark = require("../models/Bookmark");

// CREATE BOOKMARK
router.post("/", async (req, res) => {
  const newBookmark = new Bookmark(req.body);
  try {
    const savedBookmark = await newBookmark.save();
    res.status(201).json(savedBookmark);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json("Post already bookmarked");
    } else {
      res.status(500).json(err);
    }
  }
});

// GET USER BOOKMARKS
router.get("/user/:userId", async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({
      userId: req.params.userId,
    })
      .populate("postId")
      .sort({ createdAt: -1 });

    res.status(200).json(bookmarks);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CHECK IF POST IS BOOKMARKED
router.get("/check/:userId/:postId", async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({
      userId: req.params.userId,
      postId: req.params.postId,
    });

    res.status(200).json({
      isBookmarked: !!bookmark,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE BOOKMARK
router.delete("/:id", async (req, res) => {
  try {
    await Bookmark.findByIdAndDelete(req.params.id);
    res.status(200).json("Bookmark removed");
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE BOOKMARK BY POST AND USER
router.delete("/post/:postId/user/:userId", async (req, res) => {
  try {
    await Bookmark.deleteOne({
      postId: req.params.postId,
      userId: req.params.userId,
    });
    res.status(200).json("Bookmark removed");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
