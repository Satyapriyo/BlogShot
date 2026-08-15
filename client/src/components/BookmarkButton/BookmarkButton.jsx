import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
import "./BookmarkButton.css";

const BookmarkButton = ({ postId, userId, user, url }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);

  useEffect(() => {
    if (userId && postId) {
      checkIfBookmarked();
    }
  }, [userId, postId]);

  const checkIfBookmarked = async () => {
    try {
      const res = await axios.get(`${url}/bookmarks/check/${userId}/${postId}`);
      setIsBookmarked(res.data.isBookmarked);

      if (res.data.isBookmarked) {
        const bookmarks = await axios.get(`${url}/bookmarks/user/${userId}`);
        const bookmark = bookmarks.data.find((b) => b.postId._id === postId);
        if (bookmark) setBookmarkId(bookmark._id);
      }
    } catch (err) {
      console.error("Error checking bookmark:", err);
    }
  };

  const handleBookmark = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to bookmark posts");
      return;
    }

    setLoading(true);
    try {
      if (isBookmarked) {
        // Remove bookmark
        await axios.delete(`${url}/bookmarks/post/${postId}/user/${userId}`);
        setIsBookmarked(false);
        setBookmarkId(null);
      } else {
        // Add bookmark
        const res = await axios.post(`${url}/bookmarks`, {
          userId,
          postId,
          username: user.username,
        });
        setIsBookmarked(true);
        setBookmarkId(res.data._id);
      }
    } catch (err) {
      console.error("Error toggling bookmark:", err);
      alert("Failed to update bookmark");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="bookmark-button"
      onClick={handleBookmark}
      disabled={loading || !user}
      title={isBookmarked ? "Remove bookmark" : "Bookmark post"}
    >
      {isBookmarked ? (
        <MdBookmark className="bookmark-icon filled" />
      ) : (
        <MdBookmarkBorder className="bookmark-icon" />
      )}
      <span className="bookmark-label">
        {isBookmarked ? "Bookmarked" : "Bookmark"}
      </span>
    </button>
  );
};

export default BookmarkButton;
