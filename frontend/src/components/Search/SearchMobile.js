import React from "react";
import Search from "./Search";
import { GrClose } from "react-icons/gr";

const SearchMobile = ({ onClick }) => {
  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="flex items-center justify-between shadow-md w-full">
        <Search onClick={onClick} flex1="flex-1"></Search>
        <div
          className="flex items-center justify-center w-16 h-10 bg-white rounded-full cursor-pointer"
          onClick={onClick}
        >
          <GrClose></GrClose>
        </div>
      </div>
    </div>
  );
};

export default SearchMobile;
