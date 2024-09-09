import "./posts.css";
import Post from "../post/Post";
const Posts = ({ posts }) => {
  return (
    <div className="posts -mt-32">
      <h1 className="text-6xl font-bold fontnew">All Blogs</h1>
      <div class="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
        <div class="grid w-full grid-cols-1 gap-6 mx-auto lg:grid-cols-2">
          {posts.map((p) => (
            <Post key={p._id} post={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
