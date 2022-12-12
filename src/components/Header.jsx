import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Dropdown, Avatar } from "flowbite-react";

const Header = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetch("https://blog-api-top-server-production.up.railway.app/api/category")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategory(data);
      });
  }, []);
  return (
    <div className="mb-4 mt-2 container mx-auto">
      <Navbar fluid={false} rounded={true}>
        <div className="mx-auto flex flex-wrap items-center justify-between container">
          <Link to="/" className="hover-underline font-bold text-xl">
            My Awesome Blog
          </Link>
          <Navbar.Toggle />
          <Navbar.Collapse>
            {category?.categories &&
              category.categories.map((item) => (
                <Link
                  className="hover:bg-rose-400 rounded-md p-2 transition"
                  key={item._id}
                  to={`/category/${item._id}`}
                >
                  {item.name}
                </Link>
              ))}
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
