import React from "react";
import "./Header.css";
import { Helmet } from "react-helmet";

const Header = () => {
  return (
    <>
     
      <div className="header bg-white">
        <img
          className="headerImg -mt-20 "
          src="https://res.cloudinary.com/duyocx2j0/image/upload/v1748272326/blue-surface-with-study-tools-min_yfzak1.jpg"
          alt="LCP Image"
        />
        <div className="headerTitles">
          <span className="-mt-[300px] md:text-[120px] text-5xl font-bold">
            BlogShot
          </span>
          <span className="md:mt-16 mt-8  text-black md:text-xl text-md">
            Where stories connect and ideas ignite—welcome to your blogging
            haven!
            
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;
