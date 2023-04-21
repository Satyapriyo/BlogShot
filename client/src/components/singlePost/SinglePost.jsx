import React from "react";
import "./singlePost.css"
const SinglePost = () => {
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src="https://plus.unsplash.com/premium_photo-1680612061171-e564127956f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
          alt=""
        />
        <h1 className="siglePostTitle">
          Lorem ipsum dolor sit amet
          <div className="singlePostEditContainer">
            <i className="singlePostIcon fa-regular fa-pen-to-square"></i>
            <i className="singlePostIcon fa-sharp fa-solid fa-trash"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author: <b>Satyapriyo</b>
          </span>
        </div>
        <p className="singlePostDesc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis qui
          distinctio harum unde, libero facilis nisi quos consequuntur earum
          quod, quaerat blanditiis vel soluta dolorem dolore deserunt ad ipsam
          atque accusamus, eos asperiores consequatur enim ullam! In amet
          necessitatibus quam incidunt laborum doloremque odio fugit quae
          labore. Labore omnis nobis eius porro nam aperiam aut blanditiis?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis qui
          distinctio harum unde, libero facilis nisi quos consequuntur earum
          quod, quaerat blanditiis vel soluta dolorem dolore deserunt ad ipsam
          atque accusamus, eos asperiores consequatur enim ullam! In amet
          necessitatibus quam incidunt laborum doloremque odio fugit quae
          labore. Labore omnis nobis eius porro nam aperiam aut blanditiis?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis qui
          distinctio harum unde, libero facilis nisi quos consequuntur earum
          quod, quaerat blanditiis vel soluta dolorem dolore deserunt ad ipsam
          atque accusamus, eos asperiores consequatur enim ullam! In amet
          necessitatibus quam incidunt laborum doloremque odio fugit quae
          labore. Labore omnis nobis eius porro nam aperiam aut blanditiis?
        </p>
      </div>
    </div>
  );
};

export default SinglePost;
