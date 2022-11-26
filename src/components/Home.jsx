import React from "react";
import { useState, useEffect } from "react";
import PostComponent from "./PostComponent";
import Sidebar from "./Sidebar";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);
  return (
    <div className="grid grid-cols-12 gap-12">
      <div className="col-span-9 mt-2">
        {posts.posts &&
          posts.posts.map((post) => (
            <PostComponent key={post._id} post={post} />
          ))}
      </div>
      <div className="col-span-3">
        <div className="shadow-lg rounded-lg">
          <Sidebar posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default Home;
