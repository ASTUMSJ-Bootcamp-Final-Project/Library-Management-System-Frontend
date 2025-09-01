import AdminSidebar from "@/components/AdminSidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { FaCheck, FaTimes, FaClock, FaExclamationTriangle, FaBook, FaUser, FaCalendarAlt } from "react-icons/fa";
import { borrowAPI, utils } from "@/services/api";

const Orders = () => {
  const { isDark } = useTheme();
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});
  const [filter, setFilter] = useState('all'); // all, pending, borrowed, returned, overdue

  useEffect(() => {
    fetchBorrows();
  }, []);

  const fetchBorrows = async () => {
    try {
      setLoading(true);
      const response = await borrowAPI.getAllBorrows();
      setBorrows(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch borrows');
      console.error('Error fetching borrows:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmCollection = async (borrowId) => {
    try {
      setActionLoading(prev => ({ ...prev, [borrowId]: true }));
      await borrowAPI.confirmCollection(borrowId, 14); // 14 days default
      await fetchBorrows(); // Refresh data
      alert('Book collection confirmed successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to confirm collection');
      console.error('Error confirming collection:', err);
    } finally {
      setActionLoading(prev => ({ ...prev, [borrowId]: false }));
    }
  };

  const handleCancelExpiredReservations = async () => {
    try {
      await borrowAPI.cancelExpiredReservations();
      await fetchBorrows(); // Refresh data
      alert('Expired reservations cancelled successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel expired reservations');
      console.error('Error cancelling expired reservations:', err);
    }
  };

  const filteredBorrows = borrows.filter(borrow => {
    if (filter === 'all') return true;
    if (filter === 'pending') return borrow.status === 'reserved';
    if (filter === 'borrowed') return borrow.status === 'borrowed';
    if (filter === 'returned') return borrow.status === 'returned';
    if (filter === 'overdue') return borrow.status === 'overdue' || (borrow.dueDate && utils.isOverdue(borrow.dueDate));
    return true;
  });

  if (loading) {
    return (
      <div className="flex flex-row min-h-screen bg-gray-100">
        <AdminSidebar />
        <main className="flex-1 px-6 py-3">
          <Navbar />
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
  return (
    <div className="flex flex-row min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 px-6 py-3">
        <Navbar />
          <div className="text-center py-12">
            <FaExclamationTriangle className="text-4xl text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-600 mb-2">Error</h3>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={fetchBorrows}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`flex flex-row min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
      <AdminSidebar />
      <main className="flex-1 px-6 py-3">
        <Navbar />
        
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className={`text-3xl font-bold ${isDark ? "text-white" : "text-blue-600"} mb-2`}>
              Manage Borrowings & Reservations
            </h1>
            <p className={isDark ? "text-gray-300" : "text-gray-600"}>
              Manage book reservations, confirmations, and returns
            </p>
          </div>

          {/* Filter and Actions */}
          <div className={`rounded-lg p-4 mb-6 ${isDark ? "bg-gray-800" : "bg-white"} shadow-md`}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <label className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-700"}`}>
                  Filter:
                </label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className={`px-3 py-2 rounded-lg border ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="all">All</option>
                  <option value="pending">Pending Reservations</option>
                  <option value="borrowed">Borrowed</option>
                  <option value="returned">Returned</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
              
              <button
                onClick={handleCancelExpiredReservations}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium"
              >
                Cancel Expired Reservations
              </button>
            </div>
          </div>

          {/* Borrowings Table */}
          <div className={`rounded-lg shadow-md overflow-hidden ${isDark ? "bg-gray-800" : "bg-white"}`}>
            {filteredBorrows.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`${isDark ? "bg-gray-700" : "bg-gray-50"}`}>
                    <tr>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                        Book
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                        Student
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                        Status
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                        Dates
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDark ? "divide-gray-700" : "divide-gray-200"}`}>
                    {filteredBorrows.map((borrow) => {
                      const book = borrow.book;
                      const user = borrow.user;
                      const daysRemaining = borrow.dueDate ? utils.getDaysRemaining(borrow.dueDate) : null;
                      const isOverdue = borrow.dueDate ? utils.isOverdue(borrow.dueDate) : false;
                      
                      return (
                        <tr key={borrow._id} className={isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={utils.getBookCoverUrl(book)}
                                alt={book.title}
                                className="w-12 h-16 object-cover rounded-lg mr-4"
                              />
                              <div>
                                <div className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                                  {book.title}
                                </div>
                                <div className={`text-sm ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                                  by {book.author}
                                </div>
                              </div>
                            </div>
                          </td>
                          
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                              {user.name}
                            </div>
                            <div className={`text-sm ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                              {user.email}
                            </div>
                          </td>
                          
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${utils.getStatusColor(borrow.status)}`}>
                              {utils.getStatusText(borrow.status)}
                            </span>
                            {daysRemaining !== null && (
                              <div className={`text-xs mt-1 ${
                                isOverdue
                                  ? "text-red-600"
                                  : daysRemaining <= 3
                                  ? "text-orange-600"
                                  : "text-green-600"
                              }`}>
                                {isOverdue 
                                  ? `${Math.abs(daysRemaining)} days overdue`
                                  : `${daysRemaining} days remaining`
                                }
                              </div>
                            )}
                          </td>
                          
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                              {borrow.borrowDate && (
                                <div>Borrowed: {utils.formatDate(borrow.borrowDate)}</div>
                              )}
                              {borrow.dueDate && (
                                <div>Due: {utils.formatDate(borrow.dueDate)}</div>
                              )}
                              {borrow.reservationExpiry && (
                                <div>Expires: {utils.formatDateTime(borrow.reservationExpiry)}</div>
                              )}
                            </div>
                          </td>
                          
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {borrow.status === 'reserved' && (
                              <button
                                onClick={() => handleConfirmCollection(borrow._id)}
                                disabled={actionLoading[borrow._id]}
                                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                                  actionLoading[borrow._id]
                                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700 text-white"
                                }`}
                              >
                                <FaCheck className="inline mr-1" />
                                {actionLoading[borrow._id] ? "Confirming..." : "Confirm Collection"}
                              </button>
                            )}
                            {borrow.status === 'borrowed' && (
                              <span className="text-green-600 text-sm">
                                <FaCheck className="inline mr-1" />
                                Collected
                              </span>
                            )}
                            {borrow.status === 'returned' && (
                              <span className="text-blue-600 text-sm">
                                <FaBook className="inline mr-1" />
                                Returned
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <FaBook className={`text-4xl mx-auto mb-4 ${isDark ? "text-gray-400" : "text-gray-300"}`} />
                <h3 className={`text-lg font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  No borrowings found
                </h3>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  {filter === 'all' ? 'No borrowings or reservations yet.' : `No ${filter} borrowings found.`}
          </p>
        </div>
            )}
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Orders;
