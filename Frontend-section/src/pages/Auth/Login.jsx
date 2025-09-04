import InputForm from "@/components/InputForm";
import React from "react";
import logo from "@/assets/logo.jpg";
const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center rounded-xl shadow-2xl p-8 md:p-5 bg-white max-w-md w-full">
        <img src={logo} alt="Logo" className="h-12 mb-4 rounded" />
        <h1 className="mb-6 text-gray-900">
          ASTUMSJ Library Login
        </h1>
        <InputForm />
      </div>
    </div>
  );
};

export default Login;
