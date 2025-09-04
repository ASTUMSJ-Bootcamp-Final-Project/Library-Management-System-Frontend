import React from "react";
import SignUpForm from "@/components/SignUpForm";
const SignUp = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen relative"
      style={{
        backgroundColor: "hsla(200, 23%, 98%, 1.00)", // subtle light gray
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Subtle blue gradient overlay */}
      <div className="relative z-10 flex flex-col items-center">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;