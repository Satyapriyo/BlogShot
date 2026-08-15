import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";

const Single = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr] lg:gap-16">
          <SinglePost />
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <Sidebar />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Single;
