import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange, loading }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageClick = (page) => {
    if (page !== "..." && !loading) {
      onPageChange(page);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="pagination">
      {/* Previous Button */}
      <button
        className="pagination-btn pagination-prev"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1 || loading}
      >
        ← Previous
      </button>

      {/* Page Numbers */}
      <div className="pagination-numbers">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            className={`pagination-number ${
              page === currentPage ? "active" : ""
            } ${page === "..." ? "dots" : ""}`}
            onClick={() => handlePageClick(page)}
            disabled={page === "..." || loading}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        className="pagination-btn pagination-next"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
