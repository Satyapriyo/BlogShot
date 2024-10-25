import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const url = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`${url}/post` + search);
      setPosts(res.data);
      // console.log(res);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home bg-gray-100">
        <Posts posts={posts} />
        <Sidebar />
      </div>
      <Footer />
    </>
  );
};

export default Home;
