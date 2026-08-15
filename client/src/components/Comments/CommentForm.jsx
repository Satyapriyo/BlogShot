import React, { useState } from "react";
import axios from "axios";
import "./Comments.css";
import { GoHeart, GoHeartFill } from "react-icons/go";
import remove from "../../../public/remove.svg";

const CommentForm = ({ postId, onCommentAdded, user, url }) => {
  const [commentContent, setCommentContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const newComment = {
        postId,
        username: user.username,
        content: commentContent,
      };

      const res = await axios.post(`${url}/comments`, newComment);
      setCommentContent("");
      onCommentAdded(res.data);
    } catch (err) {
      setError("Failed to post comment. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <div className="comment-input-container">
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          className="comment-input"
          disabled={loading}
        />
        <button type="submit" className="comment-submit-btn" disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
      {error && <p className="comment-error">{error}</p>}
    </form>
  );
};

export default CommentForm;
