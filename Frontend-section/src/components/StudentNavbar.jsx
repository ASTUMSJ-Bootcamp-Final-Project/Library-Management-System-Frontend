import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.jpg";

const StudentNavbar = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const data = localStorage.getItem("user");
  const student = JSON.parse(data);
  



  // Mock student data
  const studentData = {
    name: student.username,
    email: student.email,
    notifications: 3,
  };

  return (
    <nav
      className={`sticky top-0 z-30 p-4 border-b ${
        isDark
          ? "bg-gray-800 border-gray-700 text-white"
          : "bg-white border-gray-200 text-gray-800"
      } shadow-sm`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 mr-4">
          <img src={logo} alt="Logo" className="w-8 h-8 rounded-full" />
          <span className={isDark ? "text-white font-bold" : "text-gray-900 font-bold"}>ASTUMSJ</span>
        </div>
        

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate("/student/profile")}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isDark ? "bg-blue-600" : "bg-blue-500"
              } text-white`}
              aria-label="Open Profile"
            >
              <FaUser className="text-sm" />
            </button>
            <div className="hidden md:block">
              <p
                className={`text-sm font-medium ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {studentData.name}
              </p>
              <p
                className={`text-xs ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {studentData.email}
              </p>
            </div>
            {/* Logout button removed to keep it only in the sidebar */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;
