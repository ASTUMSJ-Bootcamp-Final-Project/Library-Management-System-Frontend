import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaBook,
  FaUsers,
  FaCog,
  FaBars,
  FaPlusSquare,
  FaReceipt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

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

  return (
    <aside
      className={` h-screen sticky top-0 bg-blue-900 text-white transition-all duration-200 z-50
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
    </aside>
  );
};

export default AdminSidebar;
