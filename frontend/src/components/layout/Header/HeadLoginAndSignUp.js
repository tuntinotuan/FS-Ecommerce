import React from "react";
import { Link } from "react-router-dom";
import shopNow from "../../../images/shopNow.png";

import "./Header.css";

const HeadLoginAndSignUp = ({ title }) => {
  return (
    <header className="flex items-center h-20 bg-white fixed top-0 right-0 left-0 shadow-sm z-50">
      <div className="page-container w-full flex items-center justify-between px-3">
        <div className="flex items-center gap-5">
          <Link to="/">
            <img src={shopNow} alt="" className="w-[160px]" />
          </Link>
          <h1 className="text-2xl">{title || "Đăng nhập"}</h1>
        </div>
        <span className="text-primary cursor-pointer">Bạn cần giúp đỡ?</span>
      </div>
    </header>
  );
};

export default HeadLoginAndSignUp;
