import React from "react";
import "./post.css";
import { Link } from "react-router-dom";
const Post = ({ post }) => {
  const pf = "https://blog-api-or6z.onrender.com/images/";
  return (
    <div className="p-16 ">
      {post.photo ? (
        <img
          className="postImg object-cover object-center w-full mb-8 lg:h-48 md:h-36 rounded-xl"
          src={pf + post.photo}
          alt=""
        />
      ) : (
        <img
          className="postImg object-cover object-center w-full mb-8 lg:h-48 md:h-36 rounded-xl"
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
          <span className="mx-auto mb-8 text-2xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-3xl">
            {post.title}
          </span>
        </Link>

        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc mx-auto text-base leading-relaxed text-gray-500">
        {post.desc}
       
      </p>
      <Link
          to={`/post/${post._id}`}
          class="inline-flex link  items-center mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600"
          title="read more"
        >
          {" "}
          Read More »{" "}
        </Link>
    </div>
  );
};

export default Post;
