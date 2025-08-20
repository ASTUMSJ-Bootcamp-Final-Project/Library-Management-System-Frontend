import React from "react";
import Login from "./pages/Auth/Login";
import { Route, Router, Routes } from "react-router-dom";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import StudentDashboard from "./pages/Student/StudentDashboard";
import SignUp from "./pages/Auth/SignUp";
const App = () => {
  return (
    <div>
      {/* <Login /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
      </Routes>
    </div>
  );
};

export default App;
