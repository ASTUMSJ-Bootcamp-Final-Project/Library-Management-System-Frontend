import InputForm from "@/components/InputForm";
import React from "react";
import booksBg from "../../assets/lib11.jpg";
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
      {/* Subtle blue gradient overlay for readability */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-blue-500/20 to-transparent"></div> */}
      <div className="relative z-10 flex flex-col items-center text-white bg-opacity-80 rounded-xl shadow-xl p-8 backdrop-blur-md">
        <h1 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">
          ASTUMSJ Library Login
        </h1>
        <InputForm />
      </div>
    </div>
  );
};

export default Login;
