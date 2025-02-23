import React from "react";
import { useState, useEffect } from "react";
import PostComponent from "./PostComponent";
import Sidebar from "./Sidebar";
import CommentsBar from "./CommentsBar";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}`)
      .then((res) => res.json())
      .then((data) => {
        data.posts.reverse();
        setPosts(data);
      });
  }, []);
  return (
    <div className="grid lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-3 lg:order-2 mb-5">
        <div className="shadow-lg rounded-lg">
          <Sidebar posts={posts} />
        </div>
        <div className="shadow-lg rounded-lg mb-5 lg:block hidden">
          <CommentsBar />
        </div>
      </div>
      <div className="lg:col-span-9 mt-2">
        {posts.posts &&
          posts.posts.map((post) => (
            <PostComponent key={post._id} post={post} />
          ))}
      </div>
    </div>
  );
};

export default Home;
