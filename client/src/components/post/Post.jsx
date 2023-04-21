import React from "react";
import "./post.css";
const Post = () => {
  return (
    <div className="post">
      <img
        className="postImg"
        src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt=""
      />
      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">Music</span>
          <span className="postCat">Life</span>
        </div>
        <span className="postTitle">Lorem ipsum dolor sit.</span>
        <hr />
        <span className="postDate">1 hour ago</span>
      </div>
      <p className="postDesc">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita veniam
        repellendus quo a mollitia vitae quam in sapiente, fugit excepturi at
        commodi vel suscipit. Similique repellat perspiciatis distinctio aliquid
        facere. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Expedita veniam repellendus quo a mollitia vitae quam in sapiente, fugit
        excepturi at commodi vel suscipit. Similique repellat perspiciatis
        distinctio aliquid facere. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Expedita veniam repellendus quo a mollitia vitae quam
        in sapiente, fugit excepturi at commodi vel suscipit. Similique repellat
        perspiciatis distinctio aliquid facere.
      </p>
    </div>
  );
};

export default Post;
