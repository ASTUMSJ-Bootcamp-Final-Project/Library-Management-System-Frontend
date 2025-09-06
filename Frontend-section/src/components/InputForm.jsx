import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail, MdLock } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { authAPI } from "@/services/api";

const InputForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log("Attempting login with:", { email, password });

    try {
      const response = await authAPI.login({ email, password });
      console.log("Login response:", response.data);
      const data = response.data;

      // Save token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Navigate based on role
      if (data.user.role === "admin" || data.user.role === "super_admin") {
        navigate("/admin");
      } else {
        navigate("/student");
      }
    } catch (err) {
      console.error("Login error:", err);
      console.error("Error response:", err.response?.data);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md bg-white bg-opacity-80 rounded-xl  p-2 backdrop-blur-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label
            className="block text-blue-900 font-semibold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-400">
              <MdEmail size={20} />
            </span>
            <input
              className="border text-black border-blue-300 rounded-md px-4 py-2 w-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              type="email"
              name="email"
              id="email"
              required
              autoComplete="username"
              placeholder="librarian@library.com"
            />
          </div>
        </div>
        <div>
          <label
            className="block text-blue-900 font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-400">
              <MdLock size={20} />
            </span>
            <input
              className="border text-black border-blue-300 rounded-md px-4 py-2 w-full pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              required
              autoComplete="current-password"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-400"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>
        </div>
        {error && (
          <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
            {error}
          </div>
        )}
        <Button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md font-bold hover:bg-blue-700 transition"
        >
          Login
        </Button>
        <p className="text-center text-blue-900 mt-2">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default InputForm;
