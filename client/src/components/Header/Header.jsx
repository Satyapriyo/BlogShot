import React from "react";
import "./Header.css";
import heroImg from "../../assets/blue-surface-with-study-tools-min.jpg";
const Header = () => {
  return (
    <>
      <div className="header ">
        <img className="headerImg -mt-20  " src={heroImg} alt="" />
        <div className="headerTitles mt-72">
          <span className="headerTitleSm mt-20 text-black ">
            Where stories connect and ideas ignite—welcome to your blogging
            haven!
          </span>
          <span className="headerTitleLg font-bold">BlogShot</span>
        </div>
      </div>
    </>
  );
};

export default Header;
