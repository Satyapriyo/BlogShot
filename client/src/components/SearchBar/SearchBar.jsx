import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = ({ onOpenModal }) => {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest");
  const navigate = useNavigate();

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSortBy(newSort);
    navigate(`/blogs?sort=${newSort}`);
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    console.log("SearchBar clicked, onOpenModal:", onOpenModal);
    if (typeof onOpenModal === "function") {
      onOpenModal();
    } else {
      console.warn("onOpenModal is not a function");
    }
  };

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (onOpenModal) {
          onOpenModal();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenModal]);

  return (
    <form className="search-bar" onSubmit={handleSearchClick}>
      <div className="search-container">
        <button
          type="button"
          onClick={handleSearchClick}
          className="search-input-wrapper"
          title="Click to open search, or press Ctrl+K"
        >
          <svg
            className="search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <span className="search-placeholder">
            Click to search or press <kbd>⌘K</kbd>
          </span>
        </button>

        <select
          value={sortBy}
          onChange={handleSortChange}
          className="sort-select"
          title="Sort posts by"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="trending">Trending</option>
          <option value="popular">Most Views</option>
        </select>
      </div>
    </form>
  );
};

export default SearchBar;
