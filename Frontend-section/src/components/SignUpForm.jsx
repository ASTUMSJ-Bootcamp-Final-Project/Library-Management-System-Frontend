import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const code = e.target.code.value.trim();

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }
    if (!code) {
      const role = "student";
    }
    if (!/^\d{6}$/.test(code)) {
      setError("Admin code must be a 6-digit number.");
      return;
    }
    // You can add further validation or API call here
    setError("");
    alert("Account created! You can now log in.");
    navigate("/");
  };

  return (
    <div className="w-full max-w-xl text-white bg-opacity-80 rounded-xl shadow-xl p-8 backdrop-blur-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label className="block text-white font-semibold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="border border-blue-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="text"
            name="name"
            id="name"
            placeholder="Enter your full name"
            required
            autoComplete="name"
          />
        </div>
        <div>
          <label
            className="block text-white font-semibold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="border border-blue-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email address"
            required
            autoComplete="username"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label
              className="block text-white font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border border-blue-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              required
              autoComplete="new-password"
            />
          </div>
          <div className="flex-1">
            <label
              className="block text-white font-semibold mb-2"
              htmlFor="code"
            >
              Admin 6-Digit Code
            </label>
            <input
              className="border border-blue-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              type="text"
              name="code"
              id="code"
              required
              maxLength={6}
              pattern="\d{6}"
              placeholder="Enter 6-digit admin code"
            />
          </div>
        </div>
        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}
        <Button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md font-bold hover:bg-blue-700 transition"
        >
          Sign Up
        </Button>
        <p className="text-center mt-2">
          Already have an account?{" "}
          <Link to="/" className="text-green-500 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};
export default SignUpForm;
