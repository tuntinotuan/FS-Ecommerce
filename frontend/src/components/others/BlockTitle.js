import React from "react";

const BlockTitle = ({ className = "", children, ...props }) => {
  return (
    <div
      className={`bg-white text-center border-[4px] border-transparent border-b-primary py-4 rounded-[3px] select-none mb-3 ${className}`}
      {...props}
    >
      <h1 className="text-[16px] text-primary">
        {children || "GỢI Ý HÔM NAY"}
      </h1>
    </div>
  );
};

export default BlockTitle;
