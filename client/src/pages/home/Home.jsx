import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import Spinner from "../../components/Spinner/Spinner";
import axios from "axios";

import { useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${url}/post` + search);
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [search]);
  // useEffect(() => {
  //   const fetchSearcehPost = async () => {
  //     console.log(search);
  //     const res = await axios.get(`${url}/post/?search${search}`);
  //     setPosts(res.data);
  //   };
  //   fetchSearcehPost();
  // }, [search]);
  return (
    <>
      {loading && (
        <div className="spinner-overlay">
          <Spinner />
        </div>
      )}
      <div className={`bg-gray-100 ${loading ? "blur" : ""} fontnew`}>
        <Header />
        <div className="home justify-around ">
          <Posts posts={posts} />
          <Sidebar />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
