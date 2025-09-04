import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import logo from "../assets/logo.jpg"; // Adjust path as needed
import axios from "axios";
const SignUpForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const firstName = formData.get("firstName")?.trim();
    const lastName = formData.get("lastName")?.trim();
    const email = formData.get("email")?.trim();
    const password = formData.get("password")?.trim();
    const confirmPassword = formData.get("confirmPassword")?.trim();
    const adminCode = formData.get("adminCode")?.trim();
    const terms = formData.get("terms") === "on";

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return setError("All fields are required.");
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }
    if (adminCode && !/^\d{6}$/.test(adminCode)) {
      return setError("Admin code must be a valid 6-digit number.");
    }
    if (!terms) {
      return setError("You must agree to the terms.");
    }

    setError(""); // Clear previous errors

    const username = `${firstName} ${lastName}`;
    const payload = {
      username,
      email,
      password,
      ...(adminCode && { adminCode }), // Only include if provided
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        payload
      );
      console.log("Signup success:", response.data);

      alert("Account created successfully! You can now log in.");
      e.target.reset();
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="w-full max-w-md bg-white bg-opacity-80 rounded-xl shadow-2xl p-8 backdrop-blur-md">
      <div className="flex flex-col items-center mb-4">
        <img
          src={logo}
          alt="Logo"
          className="w-16 h-16 mb-2 rounded-full shadow"
        />
        <h2 className="text-3xl font-bold text-blue-900 mb-2"
                      style={{ fontFamily: "Bebas_Neue" }}
        >
          
          CREATE ACCOUNT
        </h2>
        <p className="text-black mb-2 text-center">
          Join our library management system
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex gap-4">
          <div className="w-1/2">
            <label
              className="block text-blue-900 font-semibold mb-1"
              htmlFor="firstName"
            >
              First Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-400">
                <MdPerson size={20} />
              </span>
              <input
                className="border text-black border-blue-300 rounded-md px-4 py-2 w-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Mohammed"
                required
                autoComplete="given-name"
              />
            </div>
          </div>
          <div className="w-1/2">
            <label
              className="block text-blue-900 font-semibold mb-1"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-400">
                <MdPerson size={20} />
              </span>
              <input
                className="border text-black border-blue-300 rounded-md px-4 py-2 w-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Ali"
                required
                autoComplete="family-name"
              />
            </div>
          </div>
        </div>
        <div>
          <label
            className="block text-blue-900 font-semibold mb-1"
            htmlFor="email"
          >
            Email Address
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
              placeholder="mohammed.ali@gmail.com"
              required
              autoComplete="username"
            />
          </div>
        </div>
        <div>
          <label
            className="block text-blue-900 font-semibold mb-1"
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
              placeholder="Create a strong password"
              required
              autoComplete="new-password"
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
        <div>
          <label
            className="block text-blue-900 font-semibold mb-1"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-400">
              <MdLock size={20} />
            </span>
            <input
              className="border text-black border-blue-300 rounded-md px-4 py-2 w-full pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm your password"
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-400"
              onClick={() => setShowConfirm((prev) => !prev)}
              tabIndex={-1}
            >
              {showConfirm ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>
        </div>
        
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            name="terms"
            id="terms"
            className="mr-2"
            required
          />
          <label htmlFor="terms" className="text-gray-700 text-sm">
            I agree to the{" "}
            <a href="#" className="text-blue-600 font-semibold hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 font-semibold hover:underline">
              Privacy Policy
            </a>
          </label>
        </div>
        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}
        <Button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md font-bold hover:bg-blue-700 transition"
        >
          Create Account
        </Button>
        <p className="text-center text-blue-900 mt-2">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;