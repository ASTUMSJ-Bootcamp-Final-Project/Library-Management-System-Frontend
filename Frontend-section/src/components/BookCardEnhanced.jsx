import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { FaBook, FaUsers, FaEye, FaEdit } from "react-icons/fa";

const BookCardEnhanced = ({ book }) => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  //   const getStatusColor = (status) => {
  //     switch (status) {
  //       case "Available":
  //         return isDark
  //           ? "bg-green-900 text-green-200"
  //           : "bg-green-100 text-green-800";
  //       case "Unavailable":
  //         return isDark ? "bg-red-900 text-red-200" : "bg-red-100 text-red-800";
  //       default:
  //         return isDark
  //           ? "bg-gray-800 text-gray-200"
  //           : "bg-gray-100 text-gray-800";
  //     }
  //   };

  const getAvailabilityText = () => {
    const available = book.totalAmount - book.borrowed;
    return `${available} available of ${book.totalAmount}`;
  };

  return (
    <div
      className={`rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col overflow-hidden group ${
        isDark
          ? "bg-gray-800 border border-gray-700"
          : "bg-white border border-gray-200"
      }`}
      onClick={() => navigate(`/admin/book/${book.id}`)}
    >
      {/* Enhanced Book Image Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-6">
        <div className="flex items-center justify-center">
          <img
            src={book.image}
            alt={book.title}
            className="w-36 h-52 object-contain transition-transform duration-300 group-hover:scale-105"
            style={{
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.2)",
              border: "2px solid rgba(255, 255, 255, 0.8)",
              borderRadius: "4px",
            }}
          />
        </div>
        {/* <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(
              book.status
            )}`}
          >
            {book.status}
          </span>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
          <FaEye className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div> */}
      </div>

      {/* Book Details */}
      <div className="p-5 flex-1 flex flex-col">
        <h2
          className={`text-lg font-bold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {book.title}
        </h2>

        <p
          className={`text-sm mb-3 font-medium ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          by {book.author}
        </p>

        <p
          className={`text-sm mb-4 line-clamp-3 ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {book.description}
        </p>

        {/* Stats and Actions */}
        <div className="mt-auto space-y-3">
          {/* Availability Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                Availability
              </span>
              <span className={isDark ? "text-gray-300" : "text-gray-700"}>
                {getAvailabilityText()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    ((book.totalAmount - book.borrowed) / book.totalAmount) *
                    100
                  }%`,
                  backgroundColor:
                    book.borrowed === 0
                      ? "#10B981"
                      : book.borrowed === book.totalAmount
                      ? "#EF4444"
                      : "#3B82F6",
                }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-2">
              <div
                className={`p-1.5 rounded-lg ${
                  isDark ? "bg-blue-900" : "bg-blue-100"
                }`}
              >
                <FaBook
                  className={isDark ? "text-blue-300" : "text-blue-600"}
                  size={12}
                />
              </div>
              <span className={isDark ? "text-gray-300" : "text-gray-600"}>
                Total: {book.totalAmount}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`p-1.5 rounded-lg ${
                  isDark ? "bg-green-900" : "bg-green-100"
                }`}
              >
                <FaUsers
                  className={isDark ? "text-green-300" : "text-green-600"}
                  size={12}
                />
              </div>
              <span className={isDark ? "text-gray-300" : "text-gray-600"}>
                Borrowed: {book.borrowed}
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 mt-4">
            <button
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                isDark
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-100 hover:bg-blue-200 text-blue-800"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/admin/book/${book.id}`);
              }}
            >
              <FaEye size={14} />
              View Details
            </button>
            <button
              className={`py-2.5 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                isDark
                  ? "bg-gray-700 hover:bg-gray-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <FaEdit size={14} />
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCardEnhanced;
