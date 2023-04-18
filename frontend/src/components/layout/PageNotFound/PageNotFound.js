import React from "react";
import "./pagenotfound.scss";
import { FaGhost } from "react-icons/fa";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <main className="main-not-found py-10">
      <h1>
        4
        <span className="relative">
          <FaGhost className="page-not-found text-[#252B31]"></FaGhost>
          <FaGhost className="absolute -top-[10px] -left-[10px] page-not-found"></FaGhost>
        </span>
        4
      </h1>
      <h2>Error: 404 page not found</h2>
      <p>Sorry, the page you're looking for cannot be accessed</p>
      <Link to="/" className="mt-2">
        <button className="btn-back-home hover:text-primary hover:shadow-sm">
          <span>Back home</span>
        </button>
      </Link>
    </main>
  );
};

export default PageNotFound;
