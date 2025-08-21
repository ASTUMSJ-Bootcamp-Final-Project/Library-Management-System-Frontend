import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-blue-900 text-white py-4 px-6 flex flex-col md:flex-row items-center justify-between mt-8 shadow">
      <span className="font-semibold text-lg tracking-wide">
        &copy; {new Date().getFullYear()} ASTUMSJ Library Admin
      </span>
      <span className="text-sm mt-2 md:mt-0">
        Powered by <span className="font-bold text-blue-300">ASTUMSJ</span>
      </span>
    </footer>
  );
};

export default Footer;
