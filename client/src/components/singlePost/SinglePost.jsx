import React, { useEffect, useState, useContext } from "react";
import "./singlePost.css";
import { Context } from "../../context/Context";
import { Link, redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import gradient from "random-gradient"

const SinglePost = () => {
  const location = useLocation();
  const url = import.meta.env.VITE_API_URL;
  const { user } = useContext(Context);
  const pf = "https://blog-api-or6z.onrender.com/images/";
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${url}/post/` + path);
      setPost(res.data);
    };
    getPost();
  }, [path]);
  console.log(post)
  const renderers = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };
  if (!user) {
    return (
      <div className="singlePost fontnew">
        <div className="singlePostWrapper">
          {post.photo == "" ? <div className="w-full rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[300px]"></div> : <img className="singlePostImg" src={pf + post.photo} alt="" />}
          <h1 className="siglePostTitle font-bold text-5xl mt-10 mb-10 fontnew ">
            <div className="text-black">{post.title}</div>

          </h1>

          <div className="singlePostInfo">
            <span>
              Author:
              <Link className="link" to={`/?user=${post.username}`}>
                <b className="fontnew">{post.username}</b>{" "}
              </Link>
            </span>
          </div>
          <div className="singlePostDesc wysiwyg wysiwyg-slate lg:wysiwyg-xl fontnew  max-w-[70vw]">
            <ReactMarkdown components={renderers}>{post.desc}</ReactMarkdown>
          </div>
        </div>
      </div>
    )
  }


  const handleDelete = async (e) => {
    try {
      if (user) {
        await axios.delete(`/post/${path}`, {
          data: { username: user.username },
        });
        window.location.replace("/");
      }

    } catch (err) {
      console.log("not working.....!");
    }
  };

  return (
    <div className="singlePost fontnew">
      <div className="singlePostWrapper">
        {post.photo == "" ? <div className="w-full rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[300px]"></div> : <img className="singlePostImg" src={pf + post.photo} alt="" />}
        <h1 className="siglePostTitle font-bold text-5xl mt-10 mb-10 fontnew ">
          <div className="text-black">{post.title}</div>
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
              <b className="fontnew">{post.username}</b>{" "}
            </Link>
          </span>
        </div>
        <div className="singlePostDesc wysiwyg wysiwyg-slate lg:wysiwyg-xl fontnew  max-w-[70vw]">
          <ReactMarkdown components={renderers}>{post.desc}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
