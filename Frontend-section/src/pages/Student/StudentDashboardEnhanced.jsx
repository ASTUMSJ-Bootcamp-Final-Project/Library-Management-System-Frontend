import React, { useState } from "react";
import StudentSidebar from "@/components/StudentSidebar";
import StudentNavbar from "@/components/StudentNavbar";
import Footer from "@/components/Footer";
import BookList from "./BookListEnhanced";
import MyBooks from "./MyBooksEnhanced";
import { useTheme } from "@/contexts/ThemeContext";
import { FaBook, FaUser, FaClock, FaSearch } from "react-icons/fa";

const StudentDashboardEnhanced = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState("books");

  const data = localStorage.getItem("user");
  const student = JSON.parse(data);
  const studentData = {
    name: student.username,
    email: student.email,
    borrowedBooks: 3,
    totalAllowed: 5,
    fineAmount: 0,
  };
  // Mock student data
  // const studentData = {
  //   name: "John Doe",
  //   id: "STU001",
  //   email: "john.doe@student.edu",
  //   borrowedBooks: 3,
  //   totalAllowed: 5,
  //   fineAmount: 0,
  // };

  const stats = [
    {
      title: "Borrowed Books",
      value: `${studentData.borrowedBooks}/${studentData.totalAllowed}`,
      icon: <FaBook className="text-2xl" />,
      color: "bg-blue-500",
    },
    {
      title: "Account Status",
      value: "Active",
      icon: <FaUser className="text-2xl" />,
      color: "bg-green-500",
    },
    {
      title: "Pending Fines",
      value: `$${studentData.fineAmount}`,
      icon: <FaClock className="text-2xl" />,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div
      className={`flex min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <StudentSidebar />
      <main className="flex-1 p-5 md:p-6">
        <StudentNavbar />

        {/* Header Section (under navbar) */}
        <div className="mb-6 pt-6 md:pt-8">
          <h1
            className={`text-3xl md:text-4xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            } mb-2`}
          >
            Welcome back, {studentData.name}!
          </h1>
          {/* Email hidden per requirement */}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`rounded-xl p-6 ${
                isDark ? "bg-gray-800" : "bg-white"
              } shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {stat.title}
                  </p>
                  <p
                    className={`text-2xl font-bold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
            <button
              onClick={() => setActiveTab("books")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "books"
                  ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <FaBook className="inline mr-2" />
              Browse Books
            </button>
            <button
              onClick={() => setActiveTab("mybooks")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "mybooks"
                  ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <FaUser className="inline mr-2" />
              My Books
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          {activeTab === "books" && <BookList />}
          {activeTab === "mybooks" && <MyBooks />}
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default StudentDashboardEnhanced;
