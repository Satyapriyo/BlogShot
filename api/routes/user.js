const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");
const { verifyToken } = require("../middleware/auth");
const multer = require("multer");

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// UPDATE USER
router.put("/:id", verifyToken, async (req, res) => {
  if (req.body.userId !== req.params.id) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    // Hash password if provided
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ error: "Server error, try again later." });
  }
});

// DELETE USER
router.delete("/:id", verifyToken, async (req, res) => {
  if (req.body.userId !== req.params.id) {
    return res.status(401).json({ message: "Unauthorized action" });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Delete all posts by the user
    await Post.deleteMany({ username: user.username });
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "User has been deleted" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ error: "Server error, try again later." });
  }
});

// GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    console.error("Get User Error:", err);
    res.status(500).json({ error: "Server error, try again later." });
  }
});

// UPDATE PROFILE PICTURE
router.put("/:id/profile-pic", verifyToken, upload.single("profilePic"), async (req, res) => {
  if (req.body.userId !== req.params.id) {
    return res.status(401).json({ message: "Unauthorized action" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { profilePic: req.file.path },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Profile Pic Update Error:", err);
    res.status(500).json({ error: "Server error, try again later." });
  }
});

module.exports = router;
