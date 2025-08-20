import React from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import students from "@/demo/studentsData";
const InputForm = () => {
  // Handle form submission
  const navigate = useNavigate();
  //   const navigateToAdminDashboard = (event) => {
  //     event.preventDefault();
  //     // Perform login logic here
  //     // If login is successful, navigate to admin dashboard
  //     navigate("/admin");
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Perform login logic here
    const user = students.find(
      (student) => student.email === email && student.password === password
    );

    if (!user) {
      alert("Invalid email or password");
    } else {
      // If login is successful, navigate to admin dashboard
      if (user.role == "admin") {
        navigate("/admin");
      } else {
        navigate("/student");
      }
    }
  };

  return (
    <div className="flex flex-col border-4 p-6 rounded-lg shadow-lg w-96">
      <h1 className="text-2xl text-white font-bold mb-4">
        Welcome to the Library Management System
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="mb-2 text-white">
          Email:
          <input
            className="border-2 border-gray-300 p-2 rounded w-full"
            type="email"
            name="email"
            required
          />
        </label>
        <label className="mb-2 text-white">
          Password:
          <input
            className="border-2 border-gray-300 p-2 rounded w-full"
            type="password"
            name="password"
            required
          />
        </label>
        <Button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Login
        </Button>
        <p className="mt-4 text-white">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default InputForm;
