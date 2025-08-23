import React from "react";
import { Navigate } from "react-router-dom";

// Example: I used the localstorage to get the auth info
const isAuthenticated = () => {
  // we will replace with our real backend and auth logic
  return !!localStorage.getItem("user"); // this returns true if user is logged in and false otherwise
};

const PrivateRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PrivateRoute;
