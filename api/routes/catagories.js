const express = require("express");
const router = express.Router();
const Catagory = require("../models/Catagory");

const Post = require("../models/Post");
//CREATE CATAGORIES
router.post("/", async (req, res) => {
  const newCat = new Catagory(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(201).json(savedCat);
  } catch (err) {
    res.status(400).json(err);
  }
});
//GET ALL CATAGORIES
router.get("/", async (req, res) => {
  const cats = await Catagory.find();
  try {
    res.status(201).json(cats);
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
