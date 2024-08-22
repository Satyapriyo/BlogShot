import React, { useEffect, useState, useContext } from "react";
import "./singlePost.css";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SinglePost = () => {
  const location = useLocation();
  console.log(location);
  const { user } = useContext(Context);
  const pf = "http://16.171.7.188:3003/images/";
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState([]);
  useEffect(() => {  
    const getPost = async () => {
      const res = await axios.get("http://16.171.7.188:3003/api/post/" + path);
      setPost(res.data);
    };
    getPost();
  }, [path]);
  const handleDelete = async (e) => {
    try {
      await axios.delete(`/post/${path}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {
      console.log("not working.....!");
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img className="singlePostImg" src={pf + post.photo} alt="" />
        <h1 className="siglePostTitle">
          {post.title}
          {post.username === user.username && (
            <div className="singlePostEditContainer">
              <i className="singlePostIcon fa-regular fa-pen-to-square"></i>
              <i
                className="singlePostIcon fa-sharp fa-solid fa-trash"
                onClick={handleDelete}
              ></i>
            </div>
          )}
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <Link className="link" to={`/?user=${post.username}`}>
              <b>{post.username}</b>{" "}
            </Link>
          </span>
        </div>
        <p className="singlePostDesc">{post.desc}</p>
      </div>
    </div>
  );
};

export default SinglePost;
