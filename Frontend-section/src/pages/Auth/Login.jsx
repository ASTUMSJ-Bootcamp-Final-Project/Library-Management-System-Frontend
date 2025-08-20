import InputForm from "@/components/InputForm";
import React from "react";

const Login = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen "
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <InputForm />
    </div>
  );
};

export default Login;
