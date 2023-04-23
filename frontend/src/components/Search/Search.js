import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Search = ({ resMobile = "", onClick, flex1 = "" }) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    onClick && onClick();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };
  const currentUrl = window.location.href;
  useEffect(() => {
    if (!currentUrl.includes("http://localhost:3000/products/")) {
      setKeyword("");
    }
  }, [currentUrl]);
  // console.log("window.location.href", window.location.href);
  return (
    <form
      className={`${resMobile} ${flex1} bg-white text-black rounded-lg p-2 h-10 flex items-center justify-between w-80`}
      onSubmit={searchSubmitHandler}
    >
      <input
        value={keyword}
        className="rounded-lg w-full h-full outline-none ml-2"
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button
        type="submit"
        className={`h-full w-8 ${
          keyword === "" ? "opacity-50" : ""
        } text-lg pl-1`}
        disabled={keyword === ""}
      >
        <AiOutlineSearch />
      </button>
    </form>
  );
};

export default Search;
