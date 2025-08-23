import React from "react";
import Login from "./pages/Auth/Login";
import { Route, Router, Routes } from "react-router-dom";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import StudentDashboard from "./pages/Student/StudentDashboard";
import SignUp from "./pages/Auth/SignUp";
import ManageUsers from "./pages/Admin/ManageUsers";
import AddBook from "./pages/Admin/AddBook";
import Orders from "./pages/Admin/Orders";
import ManageBook from "./pages/Admin/ManageBook";
import Bookdetail from "./pages/Admin/Bookdetail";
import PrivateRoute from "@/routes/PrivateRoute";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute role="admin">
              <ManageUsers />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-book"
          element={
            <PrivateRoute role="admin">
              <AddBook />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <PrivateRoute role="admin">
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/books"
          element={
            <PrivateRoute role="admin">
              <ManageBook />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/book/:id"
          element={
            <PrivateRoute role="admin">
              <Bookdetail />
            </PrivateRoute>
          }
        />

        {/* Student Routes */}
        <Route
          path="/student"
          element={
            <PrivateRoute role="student">
              <StudentDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
