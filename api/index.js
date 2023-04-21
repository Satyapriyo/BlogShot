const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/posts");
const catagoriesRoute = require("./routes/catagories");
const multer = require("multer");
require("dotenv").config();
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to mongodb ...🚀🚀");
  })
  .catch((err) => {
    console.log(err);
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, req.body.name);
  },
  filename: (req, file, cb) => {
    cb(null, "hello.jpeg");
  },
});

const upload = multer({ storage: storage });
app.post("api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("file hasbeen uploaded");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/catagories", catagoriesRoute);
app.listen("3003", () => {
  console.log("running nodejs http://localhost:3003");
});
