import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { FaUser, FaBell, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StudentNavbar = () => {
  const { isDark } = useTheme();
  const [showProfileBox, setShowProfileBox] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Mock student data
  const studentData = {
    name: "ABDU",
    email: "abdu@gmail.com",
    notifications: 3,
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileBox(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4 relative">
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
          <div className="flex items-center space-x-3" ref={profileRef}>
            <button
              onClick={() => setShowProfileBox((v) => !v)}
              className={`w-10 h-10 rounded-full flex items-center justify-center focus:outline-none ${
                isDark ? "bg-blue-600" : "bg-blue-500"
              } text-white`}
              aria-label="Open user menu"
            >
              <span className="text-lg font-bold">
                {studentData.name[0]}
              </span>
            </button>
            <div className="hidden md:block">
              <p
                className={`text-md font-medium ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {studentData.name}
              </p>
            </div>
            {/* Profile Dropdown */}
            {showProfileBox && (
              <div
                className={`absolute right-0 mt-14 w-64 rounded-xl shadow-lg z-50 ${
                  isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                } border ${isDark ? "border-gray-700" : "border-gray-200"}`}
                style={{ minWidth: "220px" }}
              >
                <div className="flex flex-col items-center p-4">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 ${
                      isDark ? "bg-blue-700" : "bg-blue-500"
                    } text-white text-2xl font-bold`}
                  >
                    {studentData.name[0]}
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{studentData.name}</div>
                    <div className="text-xs text-gray-400">{studentData.email}</div>
                  </div>
                  <button
                    className="mt-4 w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                    onClick={() => {
                      setShowProfileBox(false);
                      navigate("/student/profile");
                    }}
                  >
                    Manage your account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
     </nav>
  );
};

export default StudentNavbar;