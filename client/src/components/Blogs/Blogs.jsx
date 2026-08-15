import React, { useContext } from "react";
import "./Blogs.css";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import logoUser from "../../assets/profile-default.svg";

const pf = "https://blog-api-or6z.onrender.com/images/";

const Blogs = ({ post }) => {
  const { user } = useContext(Context);
  const pf = "https://blog-api-or6z.onrender.com/images/";
  const coverImage =
    typeof post.photo === "string" && post.photo.length > 0
      ? post.photo
      : "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";

  return (
    <article className="flex bg-white hover:shadow-xl shadow-sm md:p-4 cursor-pointer duration-300 overflow-hidden justify-between rounded-lg">
      <div className="w-[70%]">
        <div>
          {Array.isArray(post.catagories) &&
            post.catagories.map((cat) => (
              <span
                key={cat}
                className="inline-block mr-2 mb-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
              >
                {cat}
              </span>
            ))}
          <div className="flex items-center my-4">
            <img
              src={user && user.profilePic ? user.profilePic : logoUser}
              width={25}
              height={25}
              className="rounded-full"
              alt={post.username ? `${post.username}'s avatar` : "Creator avatar"}
            />
            <p className="pl-2 text-sm text-gray-700">{post.username}</p>
          </div>
          <Link
            className="link"
            onClick={() => {
              window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
            to={`/post/${post._id}`}
          >
            <span className="md:text-3xl text-md font-bold hover:underline">
              {post.title}
            </span>
          </Link>

          <br />
        </div>
        <ReactMarkdown className="postDesc mb-3 leading-relaxed text-xl text-gray-500 line-clamp-3">
          {post.desc}
        </ReactMarkdown>
        <span className="mt-4 font-thin">
          {new Date(post.createdAt).toDateString().substring(3)}
        </span>
      </div>
      <div className="w-[30%]">
        <Link
          to={`/post/${post._id}`}
          onClick={() => {
            window.scroll({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
          aria-label={`Read full post: ${post.title}`}
        >
          <img
            className="postImg mt-10 object-cover object-center w-[300px] h-[100px] mb-8 lg:h-48 md:h-36 rounded-xl"
            src={coverImage}
            alt={post.title || "Blog cover image"}
          />
        </Link>
      </div>
    </article>
  );
};

export default Blogs;
