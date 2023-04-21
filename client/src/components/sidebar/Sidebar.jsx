import React from "react";
import "./Sidebar.css";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME </span>
        <img
          src="https://images.unsplash.com/photo-1680464722849-a9ff62493ae1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi sed
          ab animi, non quidem impedit molestiae debitis a incidunt rerum optio
          illo similique?
        </p>
      </div>
      <div className="sidebarItem">
        <div className="sidebarTitle">CATAGORIES</div>
        <div className="sidebarList">
          <div className="sidebarListItem">Life</div>
          <div className="sidebarListItem">Music</div>
          <div className="sidebarListItem">Style</div>
          <div className="sidebarListItem">Sport</div>
          <div className="sidebarListItem">Tech</div>
          <div className="sidebarListItem">Cinema</div>
        </div>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-square-instagram"></i>
          <i className="sidebarIcon fa-brands fa-square-facebook"></i>
          <i className="sidebarIcon fa-brands fa-pinterest"></i>
          <i className="sidebarIcon fa-brands fa-square-twitter"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
