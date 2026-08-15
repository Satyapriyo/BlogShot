import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Comments.css";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const CommentsSection = ({ postId, user, url }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`${url}/comments/post/${postId}`);
      console.log("Comments API response:", res.data);

      // Handle both old and new API response formats
      if (res.data.success && res.data.data) {
        // New standardized format
        setComments(Array.isArray(res.data.data) ? res.data.data : []);
      } else if (Array.isArray(res.data)) {
        // Old format or direct array response
        setComments(res.data);
      } else {
        // Fallback
        console.warn("Unexpected comments response format:", res.data);
        setComments([]);
      }
    } catch (err) {
      setError("Failed to load comments");
      console.error("Error fetching comments:", err);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentAdded = (newComment) => {
    setComments([newComment, ...comments]);
  };

  const handleCommentDeleted = (commentId) => {
    setComments(comments.filter((c) => c._id !== commentId));
  };

  const handleCommentLiked = (commentId, likes) => {
    setComments(
      comments.map((c) => (c._id === commentId ? { ...c, likes } : c)),
    );
  };

  return (
    <div className="comments-section">
      <div className="comments-header">
        <h2 className="comments-title">Comments ({comments.length})</h2>
      </div>

      {user && (
        <CommentForm
          postId={postId}
          onCommentAdded={handleCommentAdded}
          user={user}
          url={url}
        />
      )}

      {!user && (
        <div className="comments-login-prompt">
          <p>Please log in to comment</p>
        </div>
      )}

      {loading && <p className="comments-loading">Loading comments...</p>}

      {error && <p className="comments-error">{error}</p>}

      <div className="comments-list">
        {comments.length > 0
          ? comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                user={user}
                url={url}
                onCommentDeleted={handleCommentDeleted}
                onCommentLiked={handleCommentLiked}
              />
            ))
          : !loading && (
              <p className="comments-empty">
                No comments yet. Be the first to comment!
              </p>
            )}
      </div>
    </div>
  );
};

export default CommentsSection;
