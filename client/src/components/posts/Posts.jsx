import "./posts.css";
import Post from "../post/Post";
import Blogs from "../Blogs/Blogs";
const Posts = ({ posts }) => {
  return (
    <div className="posts pt-20 text-black">
      <h1 className="text-5xl md:text-6xl font-bold fontnew">All Blogs</h1>
      <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
        <div className="grid w-full grid-cols-1 gap-6 mx-auto">
          {posts.map((p) => (
            // <Post key={p._id} post={p} />
            <Blogs key={p._id} post={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
