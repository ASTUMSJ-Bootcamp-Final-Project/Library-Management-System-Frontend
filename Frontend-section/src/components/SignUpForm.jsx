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

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }
    // You can add further validation or API call here
    setError("");
    alert("Account created! You can now log in.");
    navigate("/");
  };

  return (
    <div className="w-full max-w-md bg-white bg-opacity-80 rounded-xl shadow-xl p-8 backdrop-blur-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label
            className="block text-blue-900 font-semibold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="border border-blue-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="text"
            name="name"
            id="name"
            required
            autoComplete="name"
          />
        </div>
        <div>
          <label
            className="block text-blue-900 font-semibold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="border border-blue-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="email"
            name="email"
            id="email"
            required
            autoComplete="username"
          />
        </div>
        <div>
          <label
            className="block text-blue-900 font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="border border-blue-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="password"
            name="password"
            id="password"
            required
            autoComplete="new-password"
          />
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
