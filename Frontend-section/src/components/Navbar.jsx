import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-blue-900 text-white px-6 py-3 flex items-center justify-between shadow mx-0">
      <Link
        to="/admin"
        className="font-bold text-xl tracking-wide hover:text-blue-300 transition"
      >
        ASTUMSJ ADMIN
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
        <FaUserCircle className="text-2xl" title="Admin Profile" />
      </div>
    </nav>
  );
};

export default Navbar;
