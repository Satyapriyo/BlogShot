const express = require("express");
const router = express.Router();
const User = require("../models/User");

const Post = require("../models/Post");

//CREATE NEW POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(201).json(savePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username == req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(501).json(err);
      }
    } else {
      res.status(500).json("u can update only your post..");
    }
  } catch (err) {
    res.status(400).json(err);
  }
});
//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("post hasbeen deleted ..");
      } catch (err) {
        res.status(501).json(err);
      }
    } else {
      res.status(500).json("u can delete only your post..");
    }
  } catch (err) {
    res.status(400).json(err);
  }
});
//GET POST

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(201).json(post);
  } catch (err) {
    res.status(402).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        catagories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(201).json(posts);
  } catch (err) {
    res.status(402).json(err);
  }
});

module.exports = router;
