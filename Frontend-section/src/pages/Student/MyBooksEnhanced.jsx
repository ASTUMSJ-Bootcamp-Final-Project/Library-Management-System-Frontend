import React, { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  FaBook,
  FaCalendarAlt,
  FaClock,
  FaUndo,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";
import { borrowAPI, utils } from "@/services/api";
import toast from "react-hot-toast";
import UserBorrowingHistory from "@/components/UserBorrowingHistory";

const MyBooksEnhanced = () => {
  const { isDark } = useTheme();
  const [borrowingStatus, setBorrowingStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    fetchBorrowingStatus();
  }, []);

  const fetchBorrowingStatus = async () => {
    try {
      setLoading(true);
      const response = await borrowAPI.getUserBorrowingStatus();
      setBorrowingStatus(response.data);
      setError(null);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch borrowing status"
      );
      console.error("Error fetching borrowing status:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReturnBook = async (borrowId) => {
    try {
      setActionLoading((prev) => ({ ...prev, [borrowId]: true }));
      await borrowAPI.returnBook(borrowId);
      await fetchBorrowingStatus(); // Refresh data
      toast.success(
        "Return request submitted successfully! Please wait for admin confirmation."
      );
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to submit return request"
      );
      console.error("Error submitting return request:", err);
    } finally {
      setActionLoading((prev) => ({ ...prev, [borrowId]: false }));
    }
  };

  const handleCancelReservation = async (borrowId) => {
    try {
      setActionLoading((prev) => ({ ...prev, [borrowId]: true }));
      await borrowAPI.cancelReservation(borrowId);
      await fetchBorrowingStatus(); // Refresh data
      toast.success("Reservation cancelled successfully!");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to cancel reservation"
      );
      console.error("Error cancelling reservation:", err);
    } finally {
      setActionLoading((prev) => ({ ...prev, [borrowId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-12 ${isDark ? "text-white" : "text-gray-900"}`}>
        <FaExclamationTriangle className="text-4xl text-red-500 mx-auto mb-4" />
        <h3 className={`text-lg font-semibold mb-2 ${isDark ? "text-red-400" : "text-red-600"}`}>Error</h3>
        <p className={isDark ? "text-gray-300" : "text-gray-600"}>{error}</p>
        <button
          onClick={fetchBorrowingStatus}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!borrowingStatus) {
    return (
      <div className={`text-center py-12 ${isDark ? "text-white" : "text-gray-900"}`}>
        <p className={isDark ? "text-gray-300" : "text-gray-600"}>No borrowing data available</p>
      </div>
    );
  }

  const allBooks = [
    ...(borrowingStatus?.activeBorrows || []),
    ...(borrowingStatus?.activeReservations || []),
    ...(borrowingStatus?.returnRequestedBooks || []),
    ...(borrowingStatus?.queuedBooks || []),
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2
          className={`text-2xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          } mb-2`}
        >
          My Books
        </h2>
        <p className={isDark ? "text-gray-300" : "text-gray-600"}>
          {borrowingStatus?.totalBorrowed || 0} borrowed,{" "}
          {borrowingStatus?.totalReserved || 0} reserved,{" "}
          {borrowingStatus?.totalQueued || 0} in queue,{" "}
          {borrowingStatus?.totalReturnRequested || 0} return requested
        </p>
      </div>

      {/* Borrowing Status Summary */}
      {borrowingStatus && (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <div
            className={`p-4 rounded-lg ${
              isDark ? "bg-gray-700" : "bg-blue-50"
            } border-l-4 border-blue-500`}
          >
            <div className="flex items-center">
              <FaBook
                className={`text-2xl ${
                  isDark ? "text-blue-400" : "text-blue-600"
                } mr-3`}
              />
              <div>
                <div
                  className={`text-2xl font-bold ${
                    isDark ? "text-white" : "text-blue-900"
                  }`}
                >
                  {borrowingStatus.totalBorrowed}
                </div>
                <div
                  className={`text-sm ${
                    isDark ? "text-gray-300" : "text-blue-700"
                  } text-center`}
                >
                  Borrowed
                </div>
              </div>
            </div>
          </div>

          <div
            className={`p-4 rounded-lg ${
              isDark ? "bg-gray-700" : "bg-yellow-50"
            } border-l-4 border-yellow-500`}
          >
            <div className="flex items-center">
              <FaClock
                className={`text-2xl ${
                  isDark ? "text-yellow-400" : "text-yellow-600"
                } mr-3`}
              />
              <div>
                <div
                  className={`text-2xl font-bold ${
                    isDark ? "text-white" : "text-yellow-900"
                  }`}
                >
                  {borrowingStatus.totalReserved}
                </div>
                <div
                  className={`text-sm ${
                    isDark ? "text-gray-300" : "text-yellow-700"
                  } text-center`}
                >
                  Reserved
                </div>
              </div>
            </div>
          </div>

          <div
            className={`p-4 rounded-lg ${
              isDark ? "bg-gray-700" : "bg-indigo-50"
            } border-l-4 border-indigo-500`}
          >
            <div className="flex items-center">
              <FaClock
                className={`text-2xl ${
                  isDark ? "text-indigo-400" : "text-indigo-600"
                } mr-3`}
              />
              <div>
                <div
                  className={`text-2xl font-bold ${
                    isDark ? "text-white" : "text-indigo-900"
                  }`}
                >
                  {borrowingStatus.totalQueued || 0}
                </div>
                <div
                  className={`text-sm ${
                    isDark ? "text-gray-300" : "text-indigo-700"
                  } text-center`}
                >
                  In Queue
                </div>
              </div>
            </div>
          </div>

          <div
            className={`p-4 rounded-lg ${
              isDark ? "bg-gray-700" : "bg-red-50"
            } border-l-4 border-red-500`}
          >
            <div className="flex items-center">
              <FaExclamationTriangle
                className={`text-2xl ${
                  isDark ? "text-red-400" : "text-red-600"
                } mr-3`}
              />
              <div>
                <div
                  className={`text-2xl font-bold ${
                    isDark ? "text-white" : "text-red-900"
                  }`}
                >
                  {borrowingStatus.overdueBooksCount || 0}
                </div>
                <div
                  className={`text-sm ${
                    isDark ? "text-gray-300" : "text-red-700"
                  } text-center`}
                >
                  Overdue
                </div>
              </div>
            </div>
          </div>

          <div
            className={`p-4 rounded-lg ${
              isDark ? "bg-gray-700" : "bg-green-50"
            } border-l-4 border-green-500`}
          >
            <div className="flex items-center">
              <FaCheckCircle
                className={`text-2xl ${
                  isDark ? "text-green-400" : "text-green-600"
                } mr-3`}
              />
              <div>
                <div
                  className={`text-2xl font-bold ${
                    isDark ? "text-white" : "text-green-900"
                  }`}
                >
                  {borrowingStatus.booksRemaining}
                </div>
                <div
                  className={`text-sm ${
                    isDark ? "text-gray-300" : "text-green-700"
                  } text-center`}
                >
                  Can Borrow
                </div>
              </div>
            </div>
          </div>

          <div
            className={`p-4 rounded-lg ${
              isDark ? "bg-gray-700" : "bg-purple-50"
            } border-l-4 border-purple-500`}
          >
            <div className="flex items-center">
              <FaUndo
                className={`text-2xl ${
                  isDark ? "text-purple-400" : "text-purple-600"
                } mr-3`}
              />
              <div>
                <div
                  className={`text-2xl font-bold ${
                    isDark ? "text-white" : "text-purple-900"
                  }`}
                >
                  {borrowingStatus.totalReturnRequested || 0}
                </div>
                <div
                  className={`text-sm ${
                    isDark ? "text-gray-300" : "text-purple-700"
                  } text-center`}
                >
                  Return Requested
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Books List */}
      <div className="space-y-4">
        {allBooks.length > 0 ? (
          allBooks
            .filter((borrow) => borrow && borrow.book) // Filter out entries with missing book data
            .map((borrow) => {
              const book = borrow.book;
              
              // Safety check - skip if book is null/undefined
              if (!book) {
                return null;
              }

              const daysRemaining = borrow.dueDate
                ? utils.getDaysRemaining(borrow.dueDate)
                : null;
              const isOverdue = borrow.dueDate
                ? utils.isOverdue(borrow.dueDate)
                : false;

              return (
                <div
                  key={borrow._id}
                  className={`rounded-lg p-4 ${
                    isDark ? "bg-gray-700" : "bg-white"
                  } shadow-md border-l-4 ${
                    borrow.status === "overdue" || isOverdue
                      ? "border-red-500"
                      : borrow.status === "reserved"
                      ? "border-yellow-500"
                      : borrow.status === "queued"
                      ? "border-blue-500"
                      : borrow.status === "return_requested"
                      ? "border-purple-500"
                      : daysRemaining && daysRemaining <= 3
                      ? "border-orange-500"
                      : "border-green-500"
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    {/* Book Cover */}
                    <img
                      src={book ? utils.getBookCoverUrl(book) : '/src/assets/lib11.jpg'}
                      alt={book?.title || 'Book'}
                      className="w-16 h-24 object-cover rounded-lg shadow-md"
                      onError={(e) => {
                        e.target.src = '/src/assets/lib11.jpg';
                      }}
                    />

                    {/* Book Details */}
                    <div className="flex-1">
                      <h3
                        className={`text-lg font-semibold ${
                          isDark ? "text-white" : "text-gray-900"
                        } mb-1`}
                      >
                        {book?.title || 'Unknown Book'}
                      </h3>
                      <p
                        className={`text-sm ${
                          isDark ? "text-gray-300" : "text-gray-600"
                        } mb-2`}
                      >
                        by {book?.author || 'Unknown Author'}
                      </p>

                    {/* Status Badge */}
                    <div className="mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${utils.getStatusColor(
                          borrow.status
                        )}`}
                      >
                        {utils.getStatusText(borrow.status)}
                      </span>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      {borrow.borrowDate && (
                        <div className="flex items-center space-x-2">
                          <FaCalendarAlt
                            className={
                              isDark ? "text-blue-400" : "text-blue-600"
                            }
                          />
                          <span
                            className={`text-sm ${
                              isDark ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            Borrowed: {utils.formatDate(borrow.borrowDate)}
                          </span>
                        </div>
                      )}
                      {borrow.dueDate && (
                        <div className="flex items-center space-x-2">
                          <FaClock
                            className={
                              isDark ? "text-blue-400" : "text-blue-600"
                            }
                          />
                          <span
                            className={`text-sm ${
                              isDark ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            Due: {utils.formatDate(borrow.dueDate)}
                          </span>
                        </div>
                      )}
                      {borrow.reservationExpiry && (
                        <div className="flex items-center space-x-2">
                          <FaClock
                            className={
                              isDark ? "text-yellow-400" : "text-yellow-600"
                            }
                          />
                          <span
                            className={`text-sm ${
                              isDark ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            Expires:{" "}
                            {utils.formatDateTime(borrow.reservationExpiry)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Days Remaining or Overdue */}
                    {daysRemaining !== null && (
                      <div className="mb-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            isOverdue
                              ? "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200"
                              : daysRemaining <= 3
                              ? "text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-200"
                              : "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200"
                          }`}
                        >
                          {isOverdue
                            ? `${Math.abs(daysRemaining)} days overdue`
                            : `${daysRemaining} days remaining`}
                        </span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-2">
                      {(borrow.status === "borrowed" || borrow.status === "overdue") && (
                        <button
                          onClick={() => handleReturnBook(borrow._id)}
                          disabled={actionLoading[borrow._id]}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            actionLoading[borrow._id]
                              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                              : isDark
                              ? "bg-green-600 hover:bg-green-700 text-white"
                              : "bg-green-100 hover:bg-green-200 text-green-800"
                          }`}
                        >
                          <FaUndo className="inline mr-1" />
                          {actionLoading[borrow._id]
                            ? "Submitting..."
                            : borrow.status === "overdue"
                            ? "Return Overdue Book"
                            : "Request Return"}
                        </button>
                      )}
                      {borrow.status === "reserved" && (
                        <>
                          <span className="px-3 py-1 rounded-lg text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                            <FaClock className="inline mr-1" />
                            Awaiting Collection
                          </span>
                          <button
                            onClick={() => handleCancelReservation(borrow._id)}
                            disabled={actionLoading[borrow._id]}
                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                              actionLoading[borrow._id]
                                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                : isDark
                                ? "bg-red-600 hover:bg-red-700 text-white"
                                : "bg-red-100 hover:bg-red-200 text-red-800"
                            }`}
                          >
                            <FaTimes className="inline mr-1" />
                            {actionLoading[borrow._id]
                              ? "Cancelling..."
                              : "Cancel"}
                          </button>
                        </>
                      )}
                      {borrow.status === "queued" && (
                        <span className="px-3 py-1 rounded-lg text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          <FaClock className="inline mr-1" />
                          In Queue - Position {borrow.queuePosition || 'N/A'}
                        </span>
                      )}
                      {borrow.status === "return_requested" && (
                        <span className="px-3 py-1 rounded-lg text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                          <FaClock className="inline mr-1" />
                          Return Requested - Awaiting Admin Confirmation
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
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
              No books borrowed or reserved
            </h3>
            <p className={isDark ? "text-gray-300" : "text-gray-600"}>
              Start browsing our collection to borrow some books!
            </p>
          </div>
        )}
      </div>

      {/* Borrowing History Section */}
      <UserBorrowingHistory />
    </div>
  );
};

export default MyBooksEnhanced;
