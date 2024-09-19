import React from "react";
import "./Header.css";
import heroImg from "../../assets/blue-surface-with-study-tools-min.jpg";
const Header = () => {
  return (
    <>
      <div className="header ">
        <img className="headerImg -mt-20  " src={heroImg} alt="" />
        <div className="headerTitles">
          <span className="-mt-[300px] shadow md:text-[100px] text-3xl font-bold">
            BlogShot
          </span>
          <span className="mt-16 text-black md:text-xl text-lg">
            Where stories connect and ideas ignite—welcome to your blogging
            haven!
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;
