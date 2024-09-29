import React from "react";
import "./Blogs.css";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import logoUser from "../../assets/profile-default.svg";
const Blogs = ({ post }) => {
  const pf = "https://blog-api-or6z.onrender.com/images/";
  return (
    <div className="flex hover:shadow-lg md:p-3 cursor-pointer duration-300 overflow-hidden justify-between rounded-lg">
      <div className="w-[70%]">
        <div className="">
          {post.catagories.map((p) => {
            <span className="">{p}</span>;
          })}
          <div className="flex justify-between my-8 items-center w-[10%]">
            <img src={logoUser} width={25} />
            <p className="pl-2">{post.username}</p>
          </div>
          <Link
            ame="link"
            onClick={() => {
              window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
            to={`/post/${post._id}`}
          >
            {" "}
            <span className="md:text-3xl text-md font-bold">{post.title}</span>
          </Link>

          <br />
        </div>
        <ReactMarkdown className="postDesc mb-3 leading-relaxed text-xl text-gray-500">
          {post.desc}
        </ReactMarkdown>
        <span className="mt-4 font-thin">
          {new Date(post.createdAt).toDateString().substring(3)}
        </span>
        <Link
          to={`/post/${post._id}`}
          onClick={() => {
            window.scroll({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
          className=""
          title="read more"
        ></Link>
      </div>
      <div className="w-[30%]">
        {post.photo ? (
          <img
            className="postImg mt-10 object-cover object-center w-[300px] h-[100px] mb-8 lg:h-48 md:h-36 rounded-xl"
            src={pf + post.photo}
            alt=""
          />
        ) : (
          <img
            className="postImg mt-10 object-cover object-center w-[300px] h-[100px] mb-8 lg:h-48 md:h-36 rounded-xl"
            src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
        )}
      </div>
    </div>
  );
};

export default Blogs;
