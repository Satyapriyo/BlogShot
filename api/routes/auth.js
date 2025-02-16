const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;
//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {

  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    !user && res.status(400).json("wrong username");
    const validate = await bcrypt.compare(req.body.password, user.password);

    !validate && res.status(400).json("wrong password");
    const { password, ...others } = user._doc;
    const token = jwt.sign(
      others,
      jwtSecret,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true, // Prevent JavaScript access to the cookie
      secure: process.env.NODE_ENV === "production", // Use only over HTTPS in production
      maxAge: 3600000, // Token expires in 1 hour
      sameSite: "none", // Cross-site access is limited
    });
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json("logged out");
});

module.exports = router;
