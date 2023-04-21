import React, { Fragment } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import UserOptions from "./Header/UserOptions";
import { useSelector } from "react-redux";

const Main = () => {
  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  return (
    <Fragment>
      <Header></Header>
      {/* {isAuthenticated && <UserOptions user={user}></UserOptions>} */}
      <div className="mt-20 border-4 border-transparent border-b-primary">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </Fragment>
  );
};

export default Main;
