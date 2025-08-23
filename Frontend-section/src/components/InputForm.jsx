import React from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import students from "@/demo/studentsData";

const InputForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const user = students.find(
      (student) => student.email === email && student.password === password
    );

    if (!user) {
      alert("Invalid email or password");
    } else {
      // Save user info to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/student");
      }
    }
  };

  return (
    <div className="w-full max-w-md text-white bg-opacity-80 rounded-xl shadow-xl p-8 backdrop-blur-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label className="block font-semibold mb-2" htmlFor="email">
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
        <div>
          <label className="block font-semibold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="border border-blue-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            required
            autoComplete="current-password"
          />
        </div>
        <Button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md font-bold hover:bg-blue-700 transition"
        >
          Login
        </Button>
        <p className="text-center mt-2">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-green-500 font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default InputForm;
