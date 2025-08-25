import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { FaBook, FaUser, FaClock } from "react-icons/fa";

const StudentBookCard = ({ book, onBorrow }) => {
  const { isDark } = useTheme();

  const availableCopies = book.totalAmount - book.borrowed;

  const getStatusColor = () => {
    if (book.status === "Available") {
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    } else {
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    }
  };

  const getAvailabilityText = () => {
    if (availableCopies === 0) return "Out of Stock";
    if (availableCopies === 1) return "1 copy available";
    return `${availableCopies} copies available`;
  };

  return (
    <div
      className={`rounded-xl p-4 shadow-lg transition-all duration-300 hover:shadow-xl ${
        isDark
          ? "bg-gray-800 border border-gray-700"
          : "bg-white border border-gray-200"
      }`}
    >
      {/* Book Cover */}
      <div className="mb-4">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-48 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Book Details */}
      <div className="space-y-3">
        <h3
          className={`text-lg font-semibold ${
            isDark ? "text-white" : "text-gray-900"
          } line-clamp-2`}
        >
          {book.title}
        </h3>

        <div className="flex items-center space-x-2">
          <FaUser className={isDark ? "text-gray-400" : "text-gray-600"} />
          <p
            className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            by {book.author}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <FaBook className={isDark ? "text-gray-400" : "text-gray-600"} />
          <p
            className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            {getAvailabilityText()}
          </p>
        </div>

        {/* Status Badge */}
        <div className="flex items-center justify-between">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}
          >
            {book.status}
          </span>

          {book.status === "Available" && availableCopies > 0 && (
            <button
              onClick={() => onBorrow(book.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isDark
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              } shadow-md hover:shadow-lg`}
            >
              Borrow
            </button>
          )}
        </div>

        {/* Description */}
        <p
          className={`text-sm ${
            isDark ? "text-gray-400" : "text-gray-600"
          } line-clamp-3`}
        >
          {book.description}
        </p>
      </div>
    </div>
  );
};

export default StudentBookCard;
