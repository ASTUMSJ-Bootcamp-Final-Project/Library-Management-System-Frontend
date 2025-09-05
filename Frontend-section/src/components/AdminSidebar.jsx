import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaBook,
  FaUsers,
  FaCog,
  FaBars,
  FaTimes,
  FaPlusSquare,
  FaReceipt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";

const menuItems = [
  { name: "Dashboard", icon: <FaTachometerAlt />, link: "/admin" },
  { name: "Books", icon: <FaBook />, link: "/admin/books" },
  { name: "Add Book", icon: <FaPlusSquare />, link: "/admin/add-book" },
  { name: "Orders", icon: <FaReceipt />, link: "/admin/orders" },
  { name: "Users", icon: <FaUsers />, link: "/admin/users" },
  { name: "Profile", icon: <FaUser />, link: "/admin/profile" },
  // { name: "Settings", icon: <FaCog />, link: "/admin/settings" },
];

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`h-screen sticky top-0 transition-[width] duration-300 ease-in-out z-40 flex flex-col overflow-hidden ${
        isDark
          ? "bg-gray-900 border-r border-gray-700 text-white"
          : "bg-white border-r border-gray-200 text-gray-800"
      } ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* Header */}
      <div
        className={`flex items-center p-4 border-b ${
          isDark ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-2 rounded-lg transition-colors ${
            isDark
              ? "text-gray-400 hover:text-white hover:bg-gray-800"
              : "text-gray-600 hover:text-blue-700 hover:bg-gray-100"
          }`}
        >
          {collapsed ? (
            <FaBars className="text-lg" />
          ) : (
            <FaTimes className="text-lg" />
          )}
        </button>
        {!collapsed && (
          <span
            className={`ml-3 font-bold text-lg ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            ASTUMSJ Library
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.link}
                className={`flex items-center px-4 py-3 mx-2 rounded-lg transition-all duration-200 ${
                  isActive(item.link)
                    ? isDark
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-blue-100 text-blue-700 border border-blue-200"
                    : isDark
                    ? "text-gray-300 hover:text-white hover:bg-gray-800"
                    : "text-gray-600 hover:text-blue-700 hover:bg-gray-100"
                }`}
              >
                <span
                  className={`text-lg ${
                    isActive(item.link) ? "text-white" : ""
                  }`}
                >
                  {item.icon}
                </span>
                <span
                  className={`ml-3 font-medium text-sm transition-opacity duration-200 ${
                    collapsed ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Section */}
      <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="mb-4">
          <ThemeToggle />
        </div>
        <button
          onClick={handleLogout}
          className={`w-full flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
            isDark
              ? "text-red-400 hover:text-red-300 hover:bg-red-900/30"
              : "text-red-600 hover:text-red-700 hover:bg-red-100"
          }`}
        >
          <FaSignOutAlt className="text-lg" />
          {!collapsed && (
            <span className="ml-3 font-medium text-sm">Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
