import React, { useEffect, useState, useContext } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import remove from "../../../public/remove.svg";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import { Helmet } from "react-helmet";
import CommentsSection from "../Comments";

const SinglePost = () => {
  const location = useLocation();
  const url = import.meta.env.VITE_API_URL;
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useContext(Context);
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${url}/post/${path}`);
        console.log("Single post API response:", res.data);

        if (res.data.success && res.data.data) {
          setPost(res.data.data);
        } else if (res.data.data) {
          setPost(res.data.data);
        } else {
          setPost(res.data);
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load post");
        setPost([]);
      } finally {
        setLoading(false);
      }
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
          className="rounded-sm !mt-2 !mb-6 text-sm"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code
          className="rounded bg-[#1A1A18]/5 px-1.5 py-0.5 font-mono text-[0.9em] text-[#1A1A18]"
          {...props}
        >
          {children}
        </code>
      );
    },
    h1({ children }) {
      return (
        <h2 className="font-display mb-5 mt-10 text-3xl font-medium tracking-tight text-[#1A1A18]">
          {children}
        </h2>
      );
    },
    h2({ children }) {
      return (
        <h2 className="font-display mb-5 mt-10 text-2xl font-medium tracking-tight text-[#1A1A18]">
          {children}
        </h2>
      );
    },
    h3({ children }) {
      return (
        <h3 className="font-display mb-4 mt-8 text-xl font-medium tracking-tight text-[#1A1A18]">
          {children}
        </h3>
      );
    },
    p({ children }) {
      return (
        <p className="mb-6 text-base leading-relaxed text-[#1A1A18]/85 sm:text-[1.0625rem]">
          {children}
        </p>
      );
    },
    a({ children, href }) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#C75D3C] underline decoration-[#C75D3C]/40 decoration-2 underline-offset-2 hover:decoration-[#C75D3C]"
        >
          {children}
        </a>
      );
    },
    strong({ children }) {
      return (
        <strong className="font-semibold text-[#1A1A18]">{children}</strong>
      );
    },
    em({ children }) {
      return <em className="italic text-[#1A1A18]">{children}</em>;
    },
    ul({ children }) {
      return <ul className="mb-6 ml-1 list-none space-y-2.5">{children}</ul>;
    },
    ol({ children }) {
      return (
        <ol className="mb-6 ml-1 list-decimal space-y-2.5 pl-5 marker:text-[#C75D3C] marker:font-semibold">
          {children}
        </ol>
      );
    },
    li({ children, ordered }) {
      if (ordered) {
        return (
          <li className="pl-1 text-base leading-relaxed text-[#1A1A18]/85 sm:text-[1.0625rem]">
            {children}
          </li>
        );
      }
      return (
        <li className="flex gap-3 text-base leading-relaxed text-[#1A1A18]/85 sm:text-[1.0625rem]">
          <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C75D3C]" />
          <span>{children}</span>
        </li>
      );
    },
    blockquote({ children }) {
      return (
        <blockquote className="font-display my-8 border-l-2 border-[#C75D3C] pl-5 text-lg italic leading-relaxed text-[#1A1A18]/75">
          {children}
        </blockquote>
      );
    },
    img({ src, alt }) {
      return (
        <img
          src={src}
          alt={alt}
          className="my-8 w-full rounded-sm object-cover"
        />
      );
    },
    hr() {
      return <hr className="my-10 border-[#E3DDD0]" />;
    },
  };

  const updateLikes = async () => {
    setIsLiked(true);
    await axios.put(`${url}/post/${path}/like`);
    setPost((prevPost) => ({ ...prevPost, likes: prevPost.likes + 1 }));
  };

  const pageTitle = post?.title
    ? `${post.title} – BlogShot`
    : "Blog post – BlogShot";
  const descriptionFallback =
    typeof post?.desc === "string"
      ? post.desc.replace(/[#*_`>]/g, "").slice(0, 155)
      : "";
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const canonicalUrl =
    origin && post?._id ? `${origin}/post/${post._id}` : origin || undefined;
  const imageUrl =
    typeof post?.photo === "string" && post.photo.length > 0
      ? post.photo
      : undefined;
  const jsonLd =
    post?.title && descriptionFallback
      ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: descriptionFallback,
          image: imageUrl ? [imageUrl] : undefined,
          author: post.username
            ? { "@type": "Person", name: post.username }
            : undefined,
          datePublished: post.createdAt || undefined,
          dateModified: post.updatedAt || post.createdAt || undefined,
          mainEntityOfPage: canonicalUrl
            ? { "@type": "WebPage", "@id": canonicalUrl }
            : undefined,
        }
      : null;

  const formattedDate = post?.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const seoHead = (
    <Helmet>
      <title>{pageTitle}</title>
      {descriptionFallback && (
        <meta name="description" content={descriptionFallback} />
      )}
      <meta property="og:title" content={pageTitle} />
      {descriptionFallback && (
        <meta property="og:description" content={descriptionFallback} />
      )}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      <meta name="twitter:title" content={pageTitle} />
      {descriptionFallback && (
        <meta name="twitter:description" content={descriptionFallback} />
      )}
      {post.createdAt && (
        <meta property="article:published_time" content={post.createdAt} />
      )}
      {post.updatedAt && (
        <meta property="article:modified_time" content={post.updatedAt} />
      )}
      {post.username && (
        <meta property="article:author" content={post.username} />
      )}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );

  const LoadingState = () => (
    <div className="flex h-96 items-center justify-center">
      <p className="font-mono text-sm uppercase tracking-[0.15em] text-[#1A1A18]/40">
        Loading…
      </p>
    </div>
  );

  const ErrorState = () => (
    <div className="flex h-96 items-center justify-center">
      <p className="font-sans text-lg text-[#C75D3C]">{error}</p>
    </div>
  );

  const LikeButton = ({ onClick, liked, count }) => (
    <button
      onClick={onClick}
      className="font-sans group inline-flex items-center gap-2 rounded-full border border-[#E3DDD0] px-4 py-2 text-sm font-medium text-[#1A1A18]/70 transition-colors hover:border-[#C75D3C] hover:text-[#C75D3C]"
    >
      {liked ? (
        <GoHeartFill className="text-[#C75D3C] transition-transform duration-300 group-active:scale-125" />
      ) : (
        <GoHeart className="transition-transform duration-300 group-active:scale-125" />
      )}
      <span>{count}</span>
    </button>
  );

  // --- Logged-out view ---
  if (!user) {
    return (
      <article className="font-sans">
        {loading && <LoadingState />}
        {error && <ErrorState />}
        {!loading && !error && Object.keys(post).length > 0 && (
          <>
            {seoHead}

            {post.photo === "" ? (
              <div className="flex h-72 w-full items-center justify-center bg-[#1A1A18] sm:h-96">
                <span className="font-display text-3xl italic text-white/40">
                  BlogShot
                </span>
              </div>
            ) : (
              <img
                className="h-72 w-full rounded-sm object-cover sm:h-96"
                src={post.photo}
                alt="Post image"
              />
            )}

            <div className="mt-8 border-b border-[#E3DDD0] pb-6">
              {formattedDate && (
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-[#C75D3C]">
                  {formattedDate}
                </p>
              )}
              <h1 className="font-display mt-3 text-3xl font-medium leading-tight tracking-tight text-[#1A1A18] sm:text-5xl">
                {post.title}
              </h1>
              <p className="font-sans mt-4 text-sm text-[#1A1A18]/60">
                By{" "}
                <Link
                  to={`/?user=${post.username}`}
                  className="font-semibold text-[#1A1A18] underline decoration-[#C75D3C] decoration-2 underline-offset-2 hover:text-[#C75D3C]"
                >
                  {post.username}
                </Link>
              </p>
            </div>

            <div className="font-sans mt-10">
              <ReactMarkdown components={renderers}>{post.desc}</ReactMarkdown>
            </div>

            <div className="mt-10 flex justify-end border-t border-[#E3DDD0] pt-6">
              <LikeButton onClick={() => {}} liked={false} count={post.likes} />
            </div>
          </>
        )}
      </article>
    );
  }

  const handleDelete = async () => {
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

  // --- Logged-in view ---
  return (
    <article className="font-sans">
      {loading && <LoadingState />}
      {error && <ErrorState />}
      {!loading && !error && Object.keys(post).length > 0 && (
        <>
          {seoHead}

          {post.photo === "" ? (
            <div className="flex h-72 w-full items-center justify-center bg-[#1A1A18] sm:h-96">
              <span className="font-display text-3xl italic text-white/40">
                BlogShot
              </span>
            </div>
          ) : (
            <img
              className="h-72 w-full rounded-sm object-cover sm:h-96"
              src={post.photo}
              alt={post.title || "Post image"}
            />
          )}

          <div className="mt-8 border-b border-[#E3DDD0] pb-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                {formattedDate && (
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-[#C75D3C]">
                    {formattedDate}
                  </p>
                )}
                <h1 className="font-display mt-3 text-3xl font-medium leading-tight tracking-tight text-[#1A1A18] sm:text-5xl">
                  {post.title}
                </h1>
              </div>

              {post.username === user.username && (
                <button
                  className="tooltip mt-1 flex-shrink-0 rounded-full border border-[#E3DDD0] p-2.5 text-[#1A1A18]/60 transition-colors hover:border-[#C75D3C] hover:text-[#C75D3C]"
                  data-tip="remove"
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  <img src={remove} width={18} height={18} alt="Delete post" />
                </button>
              )}

              <dialog id="my_modal_1" className="modal">
                <div className="modal-box border border-[#E3DDD0] bg-white">
                  <p className="font-sans py-4 text-[#1A1A18]/70">
                    Press ESC key or click the button below to close
                  </p>
                  <div className="modal-action">
                    <button
                      onClick={handleDelete}
                      className="font-sans rounded-full bg-[#C75D3C] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1A1A18]"
                    >
                      Delete
                    </button>
                    <form method="dialog">
                      <button className="font-sans rounded-full border border-[#E3DDD0] px-5 py-2.5 text-sm font-semibold text-[#1A1A18]/70 transition-colors hover:border-[#1A1A18] hover:text-[#1A1A18]">
                        Close
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>

            <p className="font-sans mt-4 text-sm text-[#1A1A18]/60">
              By{" "}
              <Link
                to={`/?user=${post.username}`}
                className="font-semibold text-[#1A1A18] underline decoration-[#C75D3C] decoration-2 underline-offset-2 hover:text-[#C75D3C]"
              >
                {post.username}
              </Link>
            </p>
          </div>

          <div className="mt-6 flex justify-end">
            <LikeButton
              onClick={updateLikes}
              liked={isLiked}
              count={post.likes}
            />
          </div>

          <div className="font-sans mt-10">
            <ReactMarkdown components={renderers}>{post.desc}</ReactMarkdown>
          </div>

          <div className="mt-12 border-t border-[#E3DDD0] pt-10">
            <CommentsSection postId={post._id} user={user} url={url} />
          </div>
        </>
      )}
    </article>
  );
};

export default SinglePost;
