const mongoose = require("mongoose");
const BookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create unique index so a user can't bookmark the same post twice
BookmarkSchema.index({ userId: 1, postId: 1 }, { unique: true });

module.exports = mongoose.model("Bookmark", BookmarkSchema);
