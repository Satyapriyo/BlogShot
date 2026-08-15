import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CommandPalette.css";

const CommandPalette = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;

  const navigationCommands = [
    {
      id: 1,
      label: "Home",
      description: "Go to home page",
      action: () => navigate("/"),
      type: "nav",
    },
    {
      id: 2,
      label: "Blogs",
      description: "Browse all blogs",
      action: () => navigate("/blogs"),
      type: "nav",
    },
    {
      id: 3,
      label: "About",
      description: "Learn about us",
      action: () => navigate("/about"),
      type: "nav",
    },
    {
      id: 4,
      label: "Contact",
      description: "Contact us",
      action: () => navigate("/contact"),
      type: "nav",
    },
    {
      id: 5,
      label: "Write",
      description: "Create new blog",
      action: () => navigate("/newwrite"),
      type: "nav",
    },
    {
      id: 6,
      label: "Bookmarks",
      description: "View bookmarks",
      action: () => navigate("/bookmarks"),
      type: "nav",
    },
    {
      id: 7,
      label: "Settings",
      description: "User settings",
      action: () => navigate("/settings"),
      type: "nav",
    },
  ];

  // Fetch posts when search query changes
  useEffect(() => {
    if (searchQuery.length > 2) {
      const fetchPosts = async () => {
        setIsSearching(true);
        try {
          const response = await axios.get(
            `${url}/post?search=${searchQuery}&limit=5`,
          );
          if (
            response.data.success &&
            response.data.data &&
            response.data.data.posts
          ) {
            const postCommands = response.data.data.posts.map((post) => ({
              id: `post-${post._id}`,
              label: post.title || "Untitled",
              description: post.content
                ? post.content.substring(0, 60) + "..."
                : post.category?.name || "No description",
              postId: post._id,
              type: "post",
              action: () => navigate(`/post/${post._id}`),
            }));
            setSearchResults(postCommands);
          }
        } catch (error) {
          console.error("Error searching posts:", error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      };
      fetchPosts();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Filter navigation commands
  const filteredNavigationCommands = navigationCommands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Combine search results with navigation commands
  const allResults =
    searchQuery.length > 2
      ? [...searchResults, ...filteredNavigationCommands]
      : filteredNavigationCommands;

  // Expose open method to parent components
  useImperativeHandle(ref, () => ({
    open: () => {
      console.log("CommandPalette opened");
      setIsOpen(true);
      setSearchQuery("");
      setSelectedIndex(0);
      setSearchResults([]);
    },
    close: () => {
      console.log("CommandPalette closed");
      setIsOpen(false);
    },
  }));

  // Handle Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(!isOpen);
        setSearchQuery("");
        setSelectedIndex(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < allResults.length - 1 ? prev + 1 : 0,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : allResults.length - 1,
          );
          break;
        case "Enter":
          e.preventDefault();
          if (allResults[selectedIndex]) {
            executeCommand(allResults[selectedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, allResults]);

  const executeCommand = (command) => {
    command.action();
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleSearch = (value) => {
    const query = value.trim();
    setSearchQuery(query);
    setSelectedIndex(0);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="command-palette-trigger"
        title="Press Ctrl+K or Cmd+K"
        aria-label="Open command palette"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <span className="hidden md:inline">Search posts...</span>
        <kbd>⌘K</kbd>
      </button>
    );
  }

  return (
    <>
      <div
        className="command-palette-backdrop"
        onClick={() => setIsOpen(false)}
      />
      <div className="command-palette-container">
        <div className="command-palette">
          <div className="command-palette-header">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              autoFocus
              type="text"
              placeholder="Search posts, pages and more..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="command-palette-input"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="command-palette-close"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          </div>

          <div className="command-palette-content">
            {isSearching && searchQuery.length > 2 && (
              <div className="command-palette-loading">
                <span>Searching posts...</span>
              </div>
            )}
            {!isSearching && allResults.length > 0 ? (
              <ul className="command-palette-list">
                {allResults.map((command, index) => (
                  <li key={command.id}>
                    <button
                      onClick={() => executeCommand(command)}
                      className={`command-item ${command.type === "post" ? "post-item" : ""} ${
                        index === selectedIndex ? "active" : ""
                      }`}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      {command.type === "post" && (
                        <span className="command-item-icon">📄</span>
                      )}
                      <div className="command-item-content">
                        <span className="command-item-label">
                          {command.label}
                        </span>
                        <span className="command-item-description">
                          {command.description}
                        </span>
                      </div>
                      {command.type === "post" && (
                        <span className="command-item-meta">Post</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="command-palette-empty">
                <p>
                  {searchQuery.length <= 2
                    ? "Type to search posts or navigate..."
                    : `No results found for "${searchQuery}"`}
                </p>
              </div>
            )}
          </div>

          <div className="command-palette-footer">
            <div className="command-palette-hint">
              <kbd>↑↓</kbd>
              <span>Navigate</span>
              <kbd>↵</kbd>
              <span>Select</span>
              <kbd>Esc</kbd>
              <span>Close</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

CommandPalette.displayName = "CommandPalette";

export default CommandPalette;
