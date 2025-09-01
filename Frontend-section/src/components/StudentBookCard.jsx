import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { FaBook, FaUser, FaClock, FaExclamationTriangle } from "react-icons/fa";
import { utils } from "@/services/api";

const StudentBookCard = ({ book, onBorrow, actionLoading = false, canBorrow = true, borrowingStatus }) => {
  const { isDark } = useTheme();

  const getStatusColor = () => {
    if (book.availableCopies > 0) {
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    } else {
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    }
  };

  const getAvailabilityText = () => {
    if (book.availableCopies === 0) return "Out of Stock";
    if (book.availableCopies === 1) return "1 copy available";
    return `${book.availableCopies} copies available`;
  };

  const getBorrowButtonText = () => {
    if (actionLoading) return "Reserving...";
    if (!canBorrow) {
      if (borrowingStatus?.booksRemaining === 0) return "Limit Reached";
      if (book.availableCopies === 0) return "Out of Stock";
      return "Cannot Borrow";
    }
    return "Reserve Book";
  };

  const isBorrowDisabled = () => {
    return actionLoading || !canBorrow || book.availableCopies === 0;
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
          src={utils.getBookCoverUrl(book)}
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
            {book.availableCopies > 0 ? "Available" : "Out of Stock"}
          </span>

          <button
            onClick={() => onBorrow(book._id)}
            disabled={isBorrowDisabled()}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isBorrowDisabled()
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : isDark
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            } shadow-md hover:shadow-lg`}
          >
            {getBorrowButtonText()}
          </button>
        </div>

        {/* Warning Messages */}
        {borrowingStatus?.hasOverdueBooks && (
          <div className="flex items-center space-x-2 text-orange-600 text-sm">
            <FaExclamationTriangle />
            <span>You have overdue books that need to be returned first</span>
          </div>
        )}
        
        {borrowingStatus?.booksRemaining === 0 && (
          <div className="flex items-center space-x-2 text-red-600 text-sm">
            <FaExclamationTriangle />
            <span>You have reached the maximum borrowing limit (3 books)</span>
          </div>
        )}

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
