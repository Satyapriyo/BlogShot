import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import axios from "axios";
import SidebarImg from "../../assets/sidebarTop.jpg";
import { Link } from "react-router-dom";
const Sidebar = () => {
  let a = 1;
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get(
        "https://blog-api-or6z.onrender.com/api/catagories"
      );
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar md:block hidden text-gray-700 h-full">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME </span>
        <img src={SidebarImg} alt="" />
        <p>
          A next-gen blogging site uses React.js for faster load times and better
          SEO. Features include AI-powered content recommendations, interactive
          elements, and PWA support for offline access. <br /> <br />
          Real-time collaboration, and flexible monetization empower
          creators, while community features enhance engagement, creating an
          immersive experience for all users.
        </p>
      </div>
      <div className="sidebarItem text-left">
        <div className="sidebarTitle text-left">CATAGORIES</div>
        <div className="sidebarList flex space-x-3 text-left">
          {cats.map((c) => (
            <Link key={c._id} className="link" to={`/?cat=${c.name}`}>
              <li className="text-xl px-6 py-2 rounded-2xl  text-gray-700 bg-gray-200">
                {c.name}
              </li>
            </Link>
          ))}
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
