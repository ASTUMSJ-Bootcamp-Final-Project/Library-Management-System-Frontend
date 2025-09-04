import React from "react";
import Login from "./pages/Auth/Login";
import { Route, Router, Routes } from "react-router-dom";
import AdminDashboard from "./pages/Admin/AdminDashboardModern";
import StudentDashboard from "./pages/Student/StudentDashboardEnhanced";
import SignUp from "./pages/Auth/SignUp";
import ManageUsers from "./pages/Admin/ManageUsers";
import AddBook from "./pages/Admin/AddBook";
import Orders from "./pages/Admin/Orders";
import ManageBook from "./pages/Admin/ManageBookModern";
import Bookdetail from "./pages/Admin/Bookdetail";
import StudentBookDetail from "./pages/Student/BookDetail";
import BrowseBooks from "./pages/Student/BrowseBooks";
import PrivateRoute from "@/routes/PrivateRoute";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-book" element={<AddBook/>} />
        <Route path="/student" element={< StudentDashboard/>} />
        <Route path="/admin/book/:id" element={<Bookdetail />} />
        <Route path="/admin/users" element={<ManageUsers/>} />
        <Route path="/admin/orders" element={< AddBook/>} />
        <Route path="/admin/books" element={< ManageBook/>} />
        <Route path="/student/browse-books" element={< BrowseBooks/>} />
        <Route path="/student/book/:id" element={< StudentBookDetail/>} />





        {/* Admin Routes
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        /> */}

        {/* <Route
          path="/admin/users"
          element={
            <PrivateRoute role="admin">
              <ManageUsers />
            </PrivateRoute>
          }
        /> */}
        {/* <Route
          path="/admin/add-book"
          element={
            <PrivateRoute role="admin">
              <AddBook />
            </PrivateRoute>
          }
        /> */}
        {/* <Route
          path="/admin/orders"
          element={
            <PrivateRoute role="admin">
              <Orders />
            </PrivateRoute>
          }
        /> */}
        {/* <Route
          path="/admin/books"
          element={
            <PrivateRoute role="admin">
              <ManageBook />
            </PrivateRoute>
          }
        /> */}
        {/* <Route
          path="/admin/book/:id"
          element={
            <PrivateRoute role="admin">
              <Bookdetail />
            </PrivateRoute>
          }
        /> */}

        {/* Student Routes
        <Route
          path="/student"
          element={
            <PrivateRoute role="student">
              <StudentDashboard />
            </PrivateRoute>
          }
        /> */}
        {/* <Route
          path="/student/book/:id"
          element={
            <PrivateRoute role="student">
              <StudentBookDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/browse-books"
          element={
            <PrivateRoute role="student">
              <BrowseBooks />
            </PrivateRoute>
          }
        /> */}
      </Routes>
    </div>
  );
};

export default App;
