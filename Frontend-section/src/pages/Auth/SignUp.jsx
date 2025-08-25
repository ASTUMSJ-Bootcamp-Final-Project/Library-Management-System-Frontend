import React from "react";
import SignUpForm from "@/components/SignUpForm";
import booksBg from "../../assets/lib11.jpg";
const SignUp = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen relative"
      style={{
        backgroundImage: `url(${booksBg})`,
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
