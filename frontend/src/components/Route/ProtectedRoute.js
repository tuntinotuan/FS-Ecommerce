import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin = false, children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  console.log("isAuthenticated", isAuthenticated);
  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  console.log("user.role", user?.role);
  if (isAdmin === true && user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return <Fragment>{children}</Fragment>;
};

export default ProtectedRoute;
