import React from "react";

const BlockTitle = ({
  className = "",
  children,
  locateText = "text-center",
  ...props
}) => {
  return (
    <h1
      className={`bg-white ${locateText} border-[4px] border-transparent border-b-primary py-4 text-[16px] text-primary rounded-[3px] select-none mb-3 ${className}`}
      {...props}
    >
      {children || "GỢI Ý HÔM NAY"}
    </h1>
  );
};

export default BlockTitle;
