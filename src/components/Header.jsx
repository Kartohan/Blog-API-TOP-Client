import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/api/category")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategory(data);
      });
  }, []);
  return (
    <div className="mb-4 mt-2">
      <nav className="flex container justify-between mx-auto px-4 items-center gap-2 h-10 mt-1">
        <Link to="/" className="hover-underline font-bold text-xl">
          My Awesome Blog
        </Link>
        <div className="flex gap-5">
          {category.categories &&
            category.categories.map((item) => (
              <Link
                className="hover:bg-rose-400 rounded-md p-2 transition"
                key={item._id}
                to={`/category/${item._id}`}
              >
                {item.name}
              </Link>
            ))}
        </div>
      </nav>
    </div>
  );
};

export default Header;
