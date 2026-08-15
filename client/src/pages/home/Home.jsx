import React, { useEffect } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import Spinner from "../../components/Spinner/Spinner";
import { Helmet } from "react-helmet";
import { useLocation, useSearchParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";
import { usePostStore, useCategoryStore } from "../../store";

const Home = ({ onOpenModal }) => {
  // Zustand stores
  const { posts, pagination, loading, fetchPosts } = usePostStore();
  const { categories, fetchCategories } = useCategoryStore();

  const { search } = useLocation();
  const [searchParams] = useSearchParams();

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Fetch posts when URL search params change
  useEffect(() => {
    const params = new URLSearchParams(search);
    const filters = {
      page: parseInt(params.get("page")) || 1,
      limit: parseInt(params.get("limit")) || 10,
    };

    if (params.get("search")) filters.search = params.get("search");
    if (params.get("sort")) filters.sort = params.get("sort");
    if (params.get("user")) filters.user = params.get("user");
    if (params.get("cat")) filters.category = params.get("cat");

    fetchPosts(filters);
  }, [search, fetchPosts]);

  const handlePageChange = (page) => {
    const params = new URLSearchParams(search);
    params.set("page", page);
    window.location.href = `/blogs?${params.toString()}`;
  };

  return (
    <>
      <Helmet>
        <title>BlogShot – Discover trending blogs & stories</title>
        <meta
          name="description"
          content="Read the latest blogs, tutorials, and stories from creators on BlogShot. Discover trending posts across categories and topics."
        />
        <meta
          property="og:title"
          content="BlogShot – Discover trending blogs & stories"
        />
        <meta
          property="og:description"
          content="Explore fresh content from writers around the world and find your next favorite blog on BlogShot."
        />
        <link
          rel="canonical"
          href={
            typeof window !== "undefined" && window.location.origin
              ? `${window.location.origin}/blogs`
              : undefined
          }
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "BlogShot",
            url:
              typeof window !== "undefined" && window.location.origin
                ? window.location.origin
                : undefined,
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate:
                  (typeof window !== "undefined" && window.location.origin
                    ? window.location.origin
                    : "") + "/blogs?search={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          })}
        </script>
      </Helmet>

      {loading && (
        <div className="spinner-overlay">
          <Spinner />
        </div>
      )}

      <div className={`home-page ${loading ? "blur" : ""}`}>
        {/* <Header /> */}

        <div className="home-content-wrapper">
          <div className="home-container">
            {/* Main Content */}
            <div className="posts-section">
              <div className="section-header flex justify-between">
                <div className="">
                  <h2 className="section-title">Recent Posts</h2>
                  <p className="section-subtitle">
                    Explore the latest stories and articles from our community
                  </p>
                </div>
                <div className="">
                  <SearchBar onOpenModal={onOpenModal} />
                </div>
              </div>

              <Posts posts={posts} />

              {pagination && !loading && (
                <div className="pagination-wrapper">
                  <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                    loading={loading}
                  />
                </div>
              )}

              {posts.length === 0 && !loading && (
                <div className="no-posts-container">
                  <div className="no-posts-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5m-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11m3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                    </svg>
                  </div>
                  <h3>No posts found</h3>
                  <p>
                    Try adjusting your search or filters to find what you're
                    looking for
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="sidebar-section">
              <Sidebar />
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
