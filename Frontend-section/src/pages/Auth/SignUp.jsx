import React from "react";
import SignUpForm from "@/components/SignUpForm";
const SignUp = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center rounded-xl shadow-2xl p-8 md:p-5 bg-white max-w-md w-full">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
