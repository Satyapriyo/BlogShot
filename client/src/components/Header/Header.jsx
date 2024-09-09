import React from "react";
import "./Header.css";
const Header = () => {
  return (
    <>
      <div className="header">
        <div className="headerTitles">
          <span className="headerTitleSm text-white mt-10">
            Where stories connect and ideas ignite—welcome to your blogging
            haven!
          </span>
          <span className="headerTitleLg font-bold">BlogShot</span>
        </div>
        <img className="headerImg mb-36" src="/night.jpg" alt="" />
      </div>
    </>
  );
};

export default Header;
