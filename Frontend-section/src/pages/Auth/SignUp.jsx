import React from "react";
import SignUpForm from "@/components/SignUpForm";

const SignUp = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1687197180710-b2b9484a3c5f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Subtle blue gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-blue-500/20 to-transparent"></div>
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">
          Create Your Account
        </h1>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
