import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  // Example: Format username to look more like a real name
  const displayName = user.username
    ? user.username.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "";

  return (
    <nav className="w-full bg-blue-900 text-white px-6 py-3 flex items-center justify-between shadow mx-0">
      <Link
        to="/admin"
        className="font-bold text-xl tracking-wide hover:text-blue-300 transition"
      >
        ASTUMSJ Admin
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/admin/books" className="hover:text-blue-300 transition">
          Books
        </Link>
        <Link to="/admin/users" className="hover:text-blue-300 transition">
          Users
        </Link>
        <Link to="/admin/orders" className="hover:text-blue-300 transition">
          Orders
        </Link>
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-2xl" title="Admin Profile" />
          {displayName && <span className="font-semibold">{displayName}</span>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
