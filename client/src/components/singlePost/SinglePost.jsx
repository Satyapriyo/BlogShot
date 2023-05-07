import React, { useEffect, useState } from "react";
import "./singlePost.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:3003/api/post/" + path);
      setPost(res.data);
    };
    getPost();
  }, [path]);
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img className="singlePostImg" src={post.photo} alt="" />
        <h1 className="siglePostTitle">
          {post.title}
          <div className="singlePostEditContainer">
            <i className="singlePostIcon fa-regular fa-pen-to-square"></i>
            <i className="singlePostIcon fa-sharp fa-solid fa-trash"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <Link className="link" to={`/?user=${post.username}`}><b>{post.username}</b> </Link>
             
          </span>
        </div>
        <p className="singlePostDesc">{post.desc}</p>
      </div>
    </div>
  );
};

export default SinglePost;
