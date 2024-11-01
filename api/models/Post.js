const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    desc: {
      type: String,
      require: true,
    },
    photo: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
    },
    catagories: {
      type: Array,
      require: false,
    },
    likes: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
