import InputForm from "@/components/InputForm";
import React from "react";
import booksBg from "../../assets/lib11.jpg";
import logo from "../../assets/logo.jpg";

const Login = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen relative"
      style={{
        backgroundImage: `url(${booksBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Blur overlay */}
      {/*<div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-0"></div>*/}
      <div className="relative z-10 flex flex-col items-center w-full max-w-md">
      <div className="bg-gray-200 rounded-2xl shadow-2xl shadow-black-2000 p-8 w-105">          <div className="flex flex-col items-center mb-6">
            <img src={logo} alt="ASTUMSJ Logo" className="w-16 h-16 mb-2 rounded-full shadow" />
            <h2 className="text-3xl font-bold text-blue-900 mb-1">ASTUMSJ LIBRARY</h2>
            <h6 className=" text-gray-800 mb-1">Welcome to ASTUMSJ-library</h6>

          </div>
          <InputForm />
        </div>
      </div>
    </div>
  );
};

export default Login;