import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import Spinner from "../../components/Spinner/Spinner";
import axios from "axios";
import { Helmet } from "react-helmet";

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
      <Helmet>
        <title>BlogShot – Discover trending blogs & stories</title>
        <meta
          name="description"
          content="Read the latest blogs, tutorials, and stories from creators on BlogShot. Discover trending posts across categories and topics."
        />
        <meta property="og:title" content="BlogShot – Discover trending blogs & stories" />
        <meta
          property="og:description"
          content="Explore fresh content from writers around the world and find your next favorite blog on BlogShot."
        />
      </Helmet>
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
