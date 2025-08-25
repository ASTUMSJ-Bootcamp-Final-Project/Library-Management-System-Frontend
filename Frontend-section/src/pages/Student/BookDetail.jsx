import React from "react";
import { useParams } from "react-router-dom";
import books from "@/demo/Bookdata";
import { useTheme } from "@/contexts/ThemeContext";
import { FaBook, FaUser, FaClock } from "react-icons/fa";
import StudentSidebar from "@/components/StudentSidebar";
import StudentNavbar from "@/components/StudentNavbar";
import Footer from "@/components/Footer";

const BookDetail = () => {
  const { id } = useParams();
  const { isDark } = useTheme();

  // Find the book by ID
  const book = books.find((b) => b.id === parseInt(id));

  if (!book) {
    return (
      <div className={`p-4 ${isDark ? "text-white" : "text-black"}`}>
        Book not found
      </div>
    );
  }

  return (
    <div
      className={`flex min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <StudentSidebar />
      <main className="flex-1 p-6">
        <StudentNavbar />

        <div
          className={`p-6 ${
            isDark ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow-md`}
        >
          <h1
            className={`text-3xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {book.title}
          </h1>
          <div className="flex items-center mb-4">
            <img
              src={book.image}
              alt={book.title}
              className="w-32 h-48 object-cover rounded-lg shadow-md mr-4"
            />
            <div>
              <p
                className={`text-lg ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Author: {book.author}
              </p>
              <p
                className={`text-lg ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Status: {book.status}
              </p>
              <p
                className={`text-lg ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Total Copies: {book.totalAmount}
              </p>
              <p
                className={`text-lg ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Borrowed: {book.borrowed}
              </p>
            </div>
          </div>
          <h2
            className={`text-xl font-semibold mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Description
          </h2>
          <p
            className={`text-md ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            {book.description}
          </p>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default BookDetail;
