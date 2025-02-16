import React, { useEffect, useState, useContext } from "react";
import "./singlePost.css";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { Context } from "../../context/Context";
import { Link, redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";
import  remove  from "../../../public/remove.svg";
import  edit  from "../../../public/editicon.svg";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";

// import gradient from "random-gradient"

const SinglePost = () => {
  const location = useLocation();
  const url = import.meta.env.VITE_API_URL;
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useContext(Context);
  const pf = "https://blog-api-or6z.onrender.com/images/";
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${url}/post/` + path);
      setPost(res.data);
    };
    getPost();
  }, [path]);
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
  const updateLikes = async () => {
    setIsLiked(true);
    await axios.put(`${url}/post/${path}/like`);
    setPost((prevPost) => ({ ...prevPost, likes: prevPost.likes + 1 }));
  };
  if (!user) {
    return (
      <div className="singlePost fontnew">
        <div className="singlePostWrapper">
          {post.photo == "" ? (
            <div className="w-full rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[300px]"></div>
          ) : (
            <img className="singlePostImg" src={pf + post.photo} alt="" />
          )}
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
          <div className="flex justify-end space-x-2 cursor-pointer">
            <button className="text-black text-3xl">
              <GoHeart />
            </button>
            <p className="text-3xl text-black">{post.likes}</p>
          </div>
        </div>
      </div>
    );
  }

  const handleEdit = () => {};
  const handleDelete = async (e) => {
    try {
      if (user) {
        await axios.delete(`${url}/post/${path}`, {
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
        {post.photo == "" ? (
          <div className="w-full rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[300px]"></div>
        ) : (
          <img className="singlePostImg" src={pf + post.photo} alt="" />
        )}
        <di className="siglePostTitle font-bold text-5xl mt-10 mb-10 fontnew ">
          <div className="text-black">{post.title}</div>
          {post.username === user.username && (
            <div className="singlePostEditContainer">
              {/* <Link
                to={{
                  pathname: `/editor/${post._id}`,
                }}
                state={{initialData:post}}
              >
                <button
                  onClick={handleEdit}
                  className="singlePostIcon font-bold text-3xl "
                >
                  <img src={edit} width={30} height={30} alt="editIcon" />
                  
                </button>
              </Link> */}
              <button onClick={handleDelete} className="singlePostIcon tooltip " data-tip="remove">
                <img src={remove} width={30} height={30} alt="" />
              </button>
            </div>
          )}
        </di>

        <div className="singlePostInfo">
          <span>
            Author:
            <Link className="link" to={`/?user=${post.username}`}>
              <b className="fontnew">{post.username}</b>{" "}
            </Link>
          </span>
        </div>
        <div className="flex justify-end space-x-2 cursor-pointer">
          <button onClick={updateLikes} className="text-black text-3xl">
            {isLiked ? (
              <GoHeartFill className="text-red-500 active:scale-125  duration-300" />
            ) : (
              <GoHeart className="active:scale-125  duration-300" />
            )}
          </button>
          <p className="text-3xl text-black ">{post.likes}</p>
        </div>
        <div className="singlePostDesc wysiwyg wysiwyg-slate lg:wysiwyg-xl fontnew  max-w-[70vw]">
          <ReactMarkdown components={renderers}>{post.desc}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
