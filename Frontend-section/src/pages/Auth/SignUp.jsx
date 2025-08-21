import React from "react";
import SignUpForm from "@/components/SignUpForm";

const SignUp = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80')",
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
