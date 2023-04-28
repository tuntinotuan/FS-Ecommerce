import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import HeaderAdmin from "./HeaderAdmin";
import FooterAdmin from "./FooterAdmin";

const WrapAdmin = () => {
  return (
    <Fragment>
      <div className="flex">
        <Sidebar></Sidebar>
        <div className="flex-1 overflow-auto h-[100vh]">
          <HeaderAdmin />
          <div className="h-[90vh] overflow-auto">
          <Outlet />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default WrapAdmin;
