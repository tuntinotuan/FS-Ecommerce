import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import useHover from "../../hooks/useHover";
import { Link } from "react-router-dom";

const FilterPrice = ({ type, setType }) => {
  const { hovered, nodeRef } = useHover();
  // Test Sort React
  // const productsAscending = [...products].sort((a, b) => a.price - b.price);
  // const productsDescending = [...products].sort((a, b) => b.price - a.price);
  return (
    <div
      className="relative flex items-center justify-between h-full w-[200px] bg-white rounded-[3px] py-2 px-3 shadow-sm cursor-pointer"
      ref={nodeRef}
    >
      <p>Giá</p>
      <IoIosArrowDown></IoIosArrowDown>
      {hovered && (
        <div className="absolute top-[102%] left-0 right-0 bg-white rounded-[3px] shadow-md py-2 px-3 z-50">
          <ul className="flex flex-col">
            <Link
              className={`${
                type === "asc" ? "text-primary" : ""
              } hover:text-primary py-2`}
              onClick={() => (type === "asc" ? setType("") : setType("asc"))}
            >
              Giá: Thấp đến Cao
            </Link>
            <Link
              className={`${
                type === "desc" ? "text-primary" : ""
              } hover:text-primary py-2`}
              onClick={() => (type === "desc" ? setType("") : setType("desc"))}
            >
              Giá: Cao đến Thấp
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterPrice;
