import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaBook,
  FaUsers,
  FaCog,
  FaBars,
  FaPlusSquare,
  FaReceipt,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: <FaTachometerAlt />, link: "/admin" },
  { name: "Books", icon: <FaBook />, link: "/admin/books" },
  { name: "Add Book", icon: <FaPlusSquare />, link: "/admin/add-book" },
  { name: "Orders", icon: <FaReceipt />, link: "/admin/orders" },
  { name: "Users", icon: <FaUsers />, link: "/admin/users" },
  //   { name: "Settings", icon: <FaCog />, link: "/admin/settings" },
];

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <aside
      className={`h-screen sticky top-0 bg-blue-900 text-white transition-all duration-200 z-50
        ${collapsed ? "w-16" : "w-56"}
        flex flex-col`}
    >
      <div className="flex items-center p-4 border-b border-gray-800">
        <button
          className="text-xl focus:outline-none"
          onClick={() => setCollapsed(!collapsed)}
        >
          <FaBars />
        </button>
        {!collapsed && (
          <span className="ml-4 font-bold text-lg">ASTUMSJ Library</span>
        )}
      </div>
      <nav className="flex-1 mt-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.link}
                className="flex items-center px-4 py-3 hover:bg-gray-800 transition-colors"
              >
                <span className="text-xl">{item.icon}</span>
                {!collapsed && <span className="ml-4">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto mb-4">
        <button
          onClick={handleLogout}
          className="w-fit flex px-4 gap-2 hover:bg-red-400 text-white py-2 rounded transition"
        >
          <FaSignOutAlt className="text-xl" />
          {!collapsed && <span className="font-semibold">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
