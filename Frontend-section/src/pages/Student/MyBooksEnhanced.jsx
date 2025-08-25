import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { FaBook, FaCalendarAlt, FaClock, FaUndo } from "react-icons/fa";

const MyBooksEnhanced = () => {
  const { isDark } = useTheme();

  // Mock borrowed books data
  const borrowedBooks = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
      borrowDate: "2024-01-15",
      dueDate: "2024-02-15",
      status: "Borrowed",
      daysRemaining: 15,
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      image:
        "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400",
      borrowDate: "2024-01-20",
      dueDate: "2024-02-20",
      status: "Borrowed",
      daysRemaining: 10,
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      image:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
      borrowDate: "2024-01-25",
      dueDate: "2024-02-25",
      status: "Borrowed",
      daysRemaining: 5,
    },
  ];

  const handleReturnBook = (bookId) => {
    // Mock return functionality
    alert(`Book ${bookId} returned successfully!`);
  };

  const handleRenewBook = (bookId) => {
    // Mock renew functionality
    alert(`Book ${bookId} renewed successfully!`);
  };

  const getStatusColor = (daysRemaining) => {
    if (daysRemaining <= 3)
      return "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200";
    if (daysRemaining <= 7)
      return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200";
    return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200";
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2
          className={`text-2xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          } mb-2`}
        >
          My Borrowed Books
        </h2>
        <p className={isDark ? "text-gray-300" : "text-gray-600"}>
          You have {borrowedBooks.length} books currently borrowed
        </p>
      </div>

      {/* Books List */}
      <div className="space-y-4">
        {borrowedBooks.length > 0 ? (
          borrowedBooks.map((book) => (
            <div
              key={book.id}
              className={`rounded-lg p-4 ${
                isDark ? "bg-gray-700" : "bg-white"
              } shadow-md border-l-4 ${
                book.daysRemaining <= 3
                  ? "border-red-500"
                  : book.daysRemaining <= 7
                  ? "border-yellow-500"
                  : "border-green-500"
              }`}
            >
              <div className="flex items-start space-x-4">
                {/* Book Cover */}
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-16 h-24 object-cover rounded-lg shadow-md"
                />

                {/* Book Details */}
                <div className="flex-1">
                  <h3
                    className={`text-lg font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    } mb-1`}
                  >
                    {book.title}
                  </h3>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    } mb-2`}
                  >
                    by {book.author}
                  </p>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="flex items-center space-x-2">
                      <FaCalendarAlt
                        className={isDark ? "text-blue-400" : "text-blue-600"}
                      />
                      <span
                        className={`text-sm ${
                          isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Borrowed: {book.borrowDate}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaClock
                        className={isDark ? "text-blue-400" : "text-blue-600"}
                      />
                      <span
                        className={`text-sm ${
                          isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Due: {book.dueDate}
                      </span>
                    </div>
                  </div>

                  {/* Status and Actions */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        book.daysRemaining
                      )}`}
                    >
                      {book.daysRemaining} days remaining
                    </span>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleRenewBook(book.id)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          isDark
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "bg-blue-100 hover:bg-blue-200 text-blue-800"
                        }`}
                      >
                        <FaClock className="inline mr-1" />
                        Renew
                      </button>
                      <button
                        onClick={() => handleReturnBook(book.id)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          isDark
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-green-100 hover:bg-green-200 text-green-800"
                        }`}
                      >
                        <FaUndo className="inline mr-1" />
                        Return
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            className={`text-center py-12 rounded-lg ${
              isDark ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <FaBook
              className={`text-4xl mx-auto mb-4 ${
                isDark ? "text-gray-400" : "text-gray-300"
              }`}
            />
            <h3
              className={`text-lg font-semibold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              No books borrowed
            </h3>
            <p className={isDark ? "text-gray-300" : "text-gray-600"}>
              Start browsing our collection to borrow some books!
            </p>
          </div>
        )}
      </div>

      {/* Statistics */}
      {borrowedBooks.length > 0 && (
        <div
          className={`mt-6 p-4 rounded-lg ${
            isDark ? "bg-gray-700" : "bg-blue-50"
          } border-l-4 border-blue-500`}
        >
          <h4
            className={`text-lg font-semibold mb-2 ${
              isDark ? "text-white" : "text-blue-900"
            }`}
          >
            Borrowing Summary
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div
                className={`text-2xl font-bold ${
                  isDark ? "text-blue-400" : "text-blue-600"
                }`}
              >
                {borrowedBooks.length}
              </div>
              <div className={isDark ? "text-gray-300" : "text-blue-800"}>
                Total Books
              </div>
            </div>
            <div className="text-center">
              <div
                className={`text-2xl font-bold ${
                  isDark ? "text-green-400" : "text-green-600"
                }`}
              >
                {borrowedBooks.filter((b) => b.daysRemaining > 3).length}
              </div>
              <div className={isDark ? "text-gray-300" : "text-green-800"}>
                On Time
              </div>
            </div>
            <div className="text-center">
              <div
                className={`text-2xl font-bold ${
                  isDark ? "text-red-400" : "text-red-600"
                }`}
              >
                {borrowedBooks.filter((b) => b.daysRemaining <= 3).length}
              </div>
              <div className={isDark ? "text-gray-300" : "text-red-800"}>
                Due Soon
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooksEnhanced;
