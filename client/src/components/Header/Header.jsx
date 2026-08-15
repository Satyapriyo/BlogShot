import React from "react";
import "./Header.css";
import { Helmet } from "react-helmet";

const Header = () => {
  return (
    <>
      <div className="header md:-mt-20 -mt-10">
        <div className="header-background">
          <img
            className="header-image"
            src="https://res.cloudinary.com/duyocx2j0/image/upload/v1748272326/blue-surface-with-study-tools-min_yfzak1.jpg"
            alt="BlogShot Hero Background"
            loading="lazy"
          />
          <div className="header-overlay"></div>
        </div>

        <div className="header-content">
          <div className="header-text">
            <h1 className="header-title">BlogShot</h1>
            <p className="header-subtitle">
              Where stories connect and ideas ignite—welcome to your blogging
              haven!
            </p>
            <div className="header-stats">
              <div className="stat-item">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Blogs</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5K+</span>
                <span className="stat-label">Writers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Readers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
