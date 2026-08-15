import React, { useEffect, useState } from "react";
import axios from "axios";
import SidebarImg from "../../assets/sidebarTop.jpg";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [cats, setCats] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getCats = async () => {
      try {
        const res = await axios.get(`${url}/catagories`);
        setCats(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCats();
  }, []);

  useEffect(() => {
    const getRecentPosts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${url}/post?page=1&limit=5&sort=newest`);

        if (res.data.success && res.data.data && res.data.data.posts) {
          setRecentPosts(res.data.data.posts);
        } else if (Array.isArray(res.data)) {
          setRecentPosts(res.data.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching recent posts:", error);
        setRecentPosts([]);
      } finally {
        setLoading(false);
      }
    };
    getRecentPosts();
  }, []);

  return (
    <div className="hidden w-full font-sans text-[#1A1A18] md:block">
      {/* About */}
      <div className="border-b border-[#E3DDD0] pb-8">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-[#C75D3C]">
          About this place
        </p>
        <div className="mt-4 overflow-hidden rounded-sm">
          <img
            src={SidebarImg}
            width="600"
            height="600"
            className="h-40 w-full object-cover"
            alt="Person working at a desk"
          />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-[#1A1A18]/65">
          A next-gen blogging site built with React for faster load times and
          better SEO — with AI-powered recommendations and offline support baked
          in.
          <br />
          <br />
          Real-time collaboration and flexible monetization empower creators,
          while community features keep readers coming back.
        </p>
      </div>

      {/* Categories */}
      {cats && cats.length > 0 && (
        <div className="border-b border-[#E3DDD0] py-8">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-[#C75D3C]">
            Categories
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {cats.map((c) => (
              <Link key={c._id} to={`/?cat=${c.name}`}>
                <span className="inline-block rounded-full border border-[#E3DDD0] px-3.5 py-1.5 text-sm text-[#1A1A18]/75 transition-colors hover:border-[#C75D3C] hover:text-[#C75D3C]">
                  {c.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recent posts */}
      <div className="border-b border-[#E3DDD0] py-8">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-[#C75D3C]">
          Recent posts
        </p>
        {loading ? (
          <p className="mt-4 text-sm text-[#1A1A18]/40">Loading posts…</p>
        ) : recentPosts.length > 0 ? (
          <div className="mt-4 divide-y divide-[#E3DDD0]">
            {recentPosts.map((post) => (
              <Link
                key={post._id}
                to={`/post/${post._id}`}
                className="group flex gap-3 py-4 first:pt-0 last:pb-0"
              >
                {post.photo && (
                  <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-sm bg-[#1A1A18]/5">
                    <img
                      src={post.photo}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h4 className="font-display line-clamp-2 text-base font-medium leading-snug transition-colors group-hover:text-[#C75D3C]">
                    {post.title}
                  </h4>
                  <p className="mt-1 text-xs text-[#1A1A18]/50">
                    {post.username}
                  </p>
                  <div className="font-mono mt-1.5 flex gap-3 text-[11px] text-[#1A1A18]/40">
                    <span>{post.views || 0} views</span>
                    <span>{post.likes || 0} likes</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-[#1A1A18]/40">No posts yet</p>
        )}
      </div>

      {/* Follow */}
      <div className="py-8">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-[#C75D3C]">
          Follow us
        </p>
        <div className="mt-4 flex gap-3 text-xl text-[#1A1A18]/60">
          <i className="fa-brands fa-square-instagram cursor-pointer transition-colors hover:text-[#C75D3C]" />
          <i className="fa-brands fa-square-facebook cursor-pointer transition-colors hover:text-[#C75D3C]" />
          <i className="fa-brands fa-pinterest cursor-pointer transition-colors hover:text-[#C75D3C]" />
          <i className="fa-brands fa-square-twitter cursor-pointer transition-colors hover:text-[#C75D3C]" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
