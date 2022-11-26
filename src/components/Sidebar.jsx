import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ posts }) => {
  const pinned = posts.posts
    ? posts.posts.filter((post) => post.pinned === true)
    : [];
  return (
    <div className="p-5">
      <h1 className="font-bold border-b-rose-300 border-b-[1px] pb-1 mb-2">
        Pinned posts
      </h1>
      {pinned &&
        pinned.map((post) => (
          <Link key={post._id} to={`/posts/${post._id}`}>
            {post.title}
          </Link>
        ))}
    </div>
  );
};

export default Sidebar;