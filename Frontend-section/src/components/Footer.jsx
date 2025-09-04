import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin,FaTelegramPlane } from "react-icons/fa";
import { useTheme } from "@/contexts/ThemeContext";

const Footer = () => {
  const { isDark } = useTheme();

  return (
    <footer
      className={`w-full py-6 px-4 mt-8 ${
        isDark ? "bg-gray-900 text-gray-300" : "bg-white text-gray-700"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col mb-4 md:mb-0">
          <span className="font-semibold text-lg tracking-wide">
            &copy; {new Date().getFullYear()} ASTUMSJ Library
          </span>
          <span className="text-sm">
            Powered by <span className="font-bold text-blue-600">ASTUMSJ</span>
          </span>
        </div>
        <div className="flex space-x-4">
           <a
            href="https://t.me/ASTU_MSJ"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            <FaTelegramPlane className="text-xl" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            <FaFacebook className="text-xl" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            <FaTwitter className="text-xl" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            <FaInstagram className="text-xl" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            <FaLinkedin className="text-xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
