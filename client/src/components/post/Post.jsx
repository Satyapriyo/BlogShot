import React from "react";
import "./post.css";
import { Link } from "react-router-dom";
const Post = ({ post }) => {
  const pf = "https://blog-api-or6z.onrender.com/images/";
  return (
    <div className="post">
      {post.photo ? (
        <img className="postImg" src={pf +post.photo} alt="" />
      ) : (
        <img
          className="postImg"
          src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
      )}
      <div className="postInfo">
        {post.catagories.map((p) => {
          <span className="postCat">{p}</span>;
        })}
        <Link className="link" to={`/post/${post._id}`}>
          {" "}
          <span className="postTitle">{post.title}</span>
        </Link>

        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
};

export default Post;
