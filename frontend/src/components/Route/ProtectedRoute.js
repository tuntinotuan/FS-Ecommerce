import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  isAdmin = false,
  children,
  // component: Component,
  // ...rest
}) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  console.log("isAuthenticated", isAuthenticated);
  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  console.log("user.role", user?.role);
  if (isAdmin === true && user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return <Fragment>{children}</Fragment>;
  // return (
  //   <Fragment>
  //     {loading === false && (
  //       <Route
  //         {...rest}
  //         render={(props) => {
  //           if (isAuthenticated === false) {
  //             return <Navigate to="/login" />;
  //           }

  //           if (isAdmin === true && user.role !== "admin") {
  //             return <Navigate to="/login" />;
  //           }

  //           return <Component {...props} />;
  //         }}
  //       />
  //     )}
  //   </Fragment>
  // );
};

export default ProtectedRoute;
