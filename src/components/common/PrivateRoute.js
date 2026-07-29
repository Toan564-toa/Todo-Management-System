import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const check = JSON.parse(localStorage.getItem("accessToken")) || false;

  if (!check) {
    return <Navigate to="/" replace/>;
  }

  return <Outlet />;
};

export default PrivateRoute;
