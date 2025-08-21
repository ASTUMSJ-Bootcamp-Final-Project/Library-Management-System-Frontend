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
const App = () => {
  return (
    <div>
      <Routes>
        {/* <Login /> */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/add-book" element={<AddBook />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/books" element={<ManageBook />} />
        <Route path="/admin/book/:id" element={<Bookdetail />} />

        {/* Student Routes */}
        <Route path="/student" element={<StudentDashboard />} />
      </Routes>
    </div>
  );
};

export default App;
