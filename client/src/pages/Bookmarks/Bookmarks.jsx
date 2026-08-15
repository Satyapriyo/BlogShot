import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import "./Bookmarks.css";
import { Helmet } from "react-helmet";

const Bookmarks = () => {
  const { user } = useContext(Context);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchBookmarks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${url}/bookmarks/user/${user._id}`);
        setBookmarks(res.data);
        setError("");
      } catch (err) {
        setError("Failed to load bookmarks");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [user]);

  const removeBookmark = async (bookmarkId) => {
    try {
      await axios.delete(`${url}/bookmarks/${bookmarkId}`);
      setBookmarks(bookmarks.filter((b) => b._id !== bookmarkId));
    } catch (err) {
      console.error("Error removing bookmark:", err);
      alert("Failed to remove bookmark");
    }
  };

  if (!user) {
    return (
      <div className="bookmarks-container">
        <Helmet>
          <title>My Bookmarks – BlogShot</title>
        </Helmet>
        <div className="bookmarks-empty">
          <h2>Please log in to view your bookmarks</h2>
          <Link to="/login" className="login-link">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bookmarks-container">
      <Helmet>
        <title>My Bookmarks – BlogShot</title>
        <meta
          name="description"
          content={`View your saved blog posts on BlogShot. Currently have ${bookmarks.length} bookmarks.`}
        />
      </Helmet>

      <div className="bookmarks-header">
        <h1>My Bookmarks</h1>
        <p className="bookmark-count">
          {bookmarks.length} {bookmarks.length === 1 ? "bookmark" : "bookmarks"}
        </p>
      </div>

      {loading && <Spinner />}

      {error && <div className="bookmarks-error">{error}</div>}

      {!loading && bookmarks.length === 0 && (
        <div className="bookmarks-empty">
          <p>You haven't bookmarked any posts yet.</p>
          <Link to="/" className="explore-link">
            Explore Blogs
          </Link>
        </div>
      )}

      <div className="bookmarks-grid">
        {bookmarks.map((bookmark) => (
          <div key={bookmark._id} className="bookmark-card">
            {bookmark.postId?.photo && (
              <img
                src={bookmark.postId.photo}
                alt={bookmark.postId.title}
                className="bookmark-image"
              />
            )}
            <div className="bookmark-content">
              <h3 className="bookmark-title">
                <Link to={`/post/${bookmark.postId._id}`}>
                  {bookmark.postId.title}
                </Link>
              </h3>
              <p className="bookmark-description">
                {bookmark.postId.desc?.substring(0, 100)}...
              </p>
              <div className="bookmark-meta">
                <span className="bookmark-author">
                  By {bookmark.postId.username}
                </span>
                <span className="bookmark-date">
                  {new Date(bookmark.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="bookmark-stats">
                <span>❤️ {bookmark.postId.likes} likes</span>
                <span>👁️ {bookmark.postId.views} views</span>
              </div>
              <button
                className="remove-bookmark-btn"
                onClick={() => removeBookmark(bookmark._id)}
              >
                Remove Bookmark
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookmarks;
