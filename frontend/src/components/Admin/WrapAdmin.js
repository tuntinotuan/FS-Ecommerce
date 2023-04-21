import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const WrapAdmin = () => {
  return (
    <Fragment>
      <div>Header</div>
      <div className="flex items-center mt-20 border-4 border-transparent border-b-primary">
        <Sidebar></Sidebar>
        <Outlet></Outlet>
      </div>
    </Fragment>
  );
};

export default WrapAdmin;
