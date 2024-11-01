const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/posts");
const catagoriesRoute = require("./routes/catagories");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

require("dotenv").config();
// app.use(express.urlencoded({extended:true}))
console.log(process.env.CORS_URL);
const corsOptions = {
  origin: process.env.CORS_URL, // Replace with the frontend origin
  credentials: true, // This allows the server to accept cookies or credentials
};
app.use(express.json());
app.use(cors(corsOptions));
// app.use(cors({
//   origin: ["https://blog-shot-api.vercel.app/api"],
//   methods: ["POST", "GET", "PUT", "DELETE"],
//   credentials: true,
// }));

app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to mongodb ...🚀🚀");
  })
  .catch((err) => {
    console.log("the error is \n" + err);
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("file hasbeen uploaded");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/catagories", catagoriesRoute);
app.listen("3003", () => {
  console.log("Running Backend http://localhost:3003");
});
app.get("/", (req, res) => {
  res.send("server is working 🚀🚀");
});
