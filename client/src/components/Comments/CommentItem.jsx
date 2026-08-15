import React, { useState } from "react";
import axios from "axios";
import "./Comments.css";
import { GoHeart, GoHeartFill } from "react-icons/go";
import remove from "../../../public/remove.svg";

const CommentItem = ({
  comment,
  user,
  url,
  onCommentDeleted,
  onCommentLiked,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(comment.likes || 0);

  const handleDelete = async () => {
    try {
      await axios.delete(`${url}/comments/${comment._id}`, {
        data: { username: user?.username },
      });
      onCommentDeleted(comment._id);
    } catch (err) {
      console.error("Failed to delete comment:", err);
      alert("Failed to delete comment");
    }
  };

  const handleLike = async () => {
    try {
      setIsLiked(true);
      const res = await axios.put(`${url}/comments/${comment._id}/like`);

      // Handle standardized API response format
      let updatedLikes = comment.likes || 0;
      if (res.data.success && res.data.data) {
        updatedLikes = res.data.data.likes || 0;
      } else if (res.data.likes !== undefined) {
        updatedLikes = res.data.likes;
      }

      setLikes(updatedLikes);
      onCommentLiked(comment._id, updatedLikes);
    } catch (err) {
      console.error("Failed to like comment:", err);
      setIsLiked(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Invalid date";

    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (err) {
      console.error("Date formatting error:", err);
      return "Invalid date";
    }
  };

  return (
    <div className="comment-item">
      <div className="comment-header">
        <span className="comment-author">{comment.username}</span>
        <span className="comment-date">{formatDate(comment.createdAt)}</span>
      </div>
      <p className="comment-content">{comment.content}</p>
      <div className="comment-actions">
        <button className="comment-like-btn" onClick={handleLike}>
          {isLiked ? <GoHeartFill className="text-red-500" /> : <GoHeart />}
          <span className="comment-likes">{likes}</span>
        </button>
        {user && user.username === comment.username && (
          <button className="comment-delete-btn" onClick={handleDelete}>
            <img src={remove} width={16} height={16} alt="Delete" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
