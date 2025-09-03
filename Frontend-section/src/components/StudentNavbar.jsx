import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { FaUser, FaBell, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StudentNavbar = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const data = localStorage.getItem("user");
  const student = JSON.parse(data);
  const [query, setQuery] = useState("");



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
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search books, authors..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const q = query.trim();
                  if (q.length > 0) {
                    navigate(`/student/browse-books?q=${encodeURIComponent(q)}`);
                  }
                }
              }}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button
            className={`relative p-2 rounded-lg transition-colors ${
              isDark
                ? "text-gray-300 hover:text-white hover:bg-gray-700"
                : "text-gray-600 hover:text-blue-700 hover:bg-gray-100"
            }`}
          >
            <FaBell className="text-lg" />
            {studentData.notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {studentData.notifications}
              </span>
            )}
          </button>

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
