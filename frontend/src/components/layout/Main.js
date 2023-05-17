import React, { Fragment } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import Chatbot from "../Chat/Chatbot";

const Main = () => {
  return (
    <Fragment>
      <Header></Header>
      <div className="mt-20 border-4 border-transparent border-b-primary">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
      {/* <Chatbot></Chatbot> */}
    </Fragment>
  );
};

export default Main;
