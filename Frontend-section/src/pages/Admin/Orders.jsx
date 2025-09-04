import AdminSidebar from "@/components/AdminSidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { FaCheck, FaTimes, FaClock, FaExclamationTriangle, FaBook, FaUser, FaCalendarAlt, FaCreditCard, FaEye, FaCheckCircle, FaBan } from "react-icons/fa";
import { borrowAPI, utils } from "@/services/api";
import toast from "react-hot-toast";

const Orders = () => {
  const { isDark } = useTheme();
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});
  const [filter, setFilter] = useState('all'); // all, pending, borrowed, returned, overdue
  const [activeTab, setActiveTab] = useState('borrowings'); // borrowings, payments
  const [payments, setPayments] = useState([]);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    fetchBorrows();
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setPaymentLoading(true);
      // For now, we'll simulate fetching payments from localStorage
      // In a real app, this would be an API call
      const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
      const pendingPayments = allUsers.filter(user => 
        user.membershipStatus === 'waiting_for_approval'
      ).map(user => ({
        id: user._id || user.id,
        username: user.username,
        email: user.email,
        plan: user.subscriptionPlan || '3 Months',
        amount: user.subscriptionAmount || 300,
        submittedAt: user.paymentSubmittedAt || new Date().toISOString(),
        paymentProof: user.paymentProof || null,
        status: 'waiting_for_approval'
      }));
      setPayments(pendingPayments);
    } catch (err) {
      console.error('Error fetching payments:', err);
    } finally {
      setPaymentLoading(false);
    }
  };

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
      toast.success('Book collection confirmed successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to confirm collection');
      console.error('Error confirming collection:', err);
    } finally {
      setActionLoading(prev => ({ ...prev, [borrowId]: false }));
    }
  };

  const handleConfirmReturn = async (borrowId) => {
    try {
      setActionLoading(prev => ({ ...prev, [borrowId]: true }));
      await borrowAPI.confirmReturn(borrowId);
      await fetchBorrows(); // Refresh data
      toast.success('Book return confirmed successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to confirm return');
      console.error('Error confirming return:', err);
    } finally {
      setActionLoading(prev => ({ ...prev, [borrowId]: false }));
    }
  };


  const handleApprovePayment = async (paymentId) => {
    try {
      setActionLoading(prev => ({ ...prev, [paymentId]: true }));
      
      // Update user status to approved
      const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
      const updatedUsers = allUsers.map(user => 
        user.id === paymentId || user._id === paymentId
          ? { ...user, membershipStatus: 'approved' }
          : user
      );
      localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
      
      // Also update the current user if it's them
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (currentUser.id === paymentId || currentUser._id === paymentId) {
        currentUser.membershipStatus = 'approved';
        localStorage.setItem('user', JSON.stringify(currentUser));
      }
      
      await fetchPayments(); // Refresh payments list
      toast.success('Payment approved successfully! User membership is now active.');
    } catch (err) {
      toast.error('Failed to approve payment');
      console.error('Error approving payment:', err);
    } finally {
      setActionLoading(prev => ({ ...prev, [paymentId]: false }));
    }
  };

  const handleRejectPayment = async (paymentId) => {
    try {
      setActionLoading(prev => ({ ...prev, [paymentId]: true }));
      
      // Update user status to canceled
      const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
      const updatedUsers = allUsers.map(user => 
        user.id === paymentId || user._id === paymentId
          ? { ...user, membershipStatus: 'canceled' }
          : user
      );
      localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
      
      // Also update the current user if it's them
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (currentUser.id === paymentId || currentUser._id === paymentId) {
        currentUser.membershipStatus = 'canceled';
        localStorage.setItem('user', JSON.stringify(currentUser));
      }
      
      await fetchPayments(); // Refresh payments list
      toast.success('Payment rejected. User can resubmit their application.');
    } catch (err) {
      toast.error('Failed to reject payment');
      console.error('Error rejecting payment:', err);
    } finally {
      setActionLoading(prev => ({ ...prev, [paymentId]: false }));
    }
  };

  const filteredBorrows = borrows.filter(borrow => {
    if (filter === 'all') return true;
    if (filter === 'pending') return borrow.status === 'reserved';
    if (filter === 'borrowed') return borrow.status === 'borrowed';
    if (filter === 'return_requested') return borrow.status === 'return_requested';
    if (filter === 'returned') return borrow.status === 'returned';
    if (filter === 'overdue') return borrow.status === 'overdue' || (borrow.dueDate && utils.isOverdue(borrow.dueDate));
    return true;
  });

  if (loading) {
    return (
      <div className={`flex flex-row min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
        <AdminSidebar />
        <main className="flex-1 px-6 py-3">
          <Navbar />
          <div className="flex justify-center items-center h-64">
            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isDark ? "border-blue-400" : "border-blue-600"}`}></div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
  return (
    <div className={`flex flex-row min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
      <AdminSidebar />
      <main className="flex-1 px-6 py-3">
        <Navbar />
          <div className={`text-center py-12 ${isDark ? "text-gray-200" : "text-gray-800"}`}>
            <FaExclamationTriangle className={`text-4xl mx-auto mb-4 ${isDark ? "text-red-400" : "text-red-500"}`} />
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? "text-red-400" : "text-red-600"}`}>Error</h3>
            <p className={isDark ? "text-gray-300" : "text-gray-600"}>{error}</p>
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
        
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 pt-6 md:pt-8">
            <h1 className={`text-3xl font-bold ${isDark ? "text-white" : "text-blue-600"} mb-2`}>
              Manage Orders & Payments
            </h1>
            <p className={isDark ? "text-gray-300" : "text-gray-600"}>
              Manage book reservations, confirmations, returns, and membership payments
            </p>
          </div>

          {/* Tab Navigation */}
          <div className={`rounded-lg p-1 mb-6 ${isDark ? "bg-gray-800" : "bg-white"} shadow-md`}>
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('borrowings')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'borrowings'
                    ? isDark
                      ? "bg-blue-600 text-white"
                      : "bg-blue-600 text-white"
                    : isDark
                    ? "text-gray-300 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-blue-700 hover:bg-gray-100"
                }`}
              >
                <FaBook className="inline mr-2" />
                Borrowings & Reservations
                {borrows.filter(b => b.status === 'reserved' || b.status === 'return_requested').length > 0 && (
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    isDark ? "bg-orange-600 text-white" : "bg-blue-100 text-blue-800"
                  }`}>
                    {borrows.filter(b => b.status === 'reserved' || b.status === 'return_requested').length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'payments'
                    ? isDark
                      ? "bg-blue-600 text-white"
                      : "bg-blue-600 text-white"
                    : isDark
                    ? "text-gray-300 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-blue-700 hover:bg-gray-100"
                }`}
              >
                <FaCreditCard className="inline mr-2" />
                Membership Payments
                {payments.length > 0 && (
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    isDark ? "bg-orange-600 text-white" : "bg-orange-100 text-orange-800"
                  }`}>
                    {payments.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Filter and Actions - Only for Borrowings */}
          {activeTab === 'borrowings' && (
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
                    <option value="return_requested">Return Requested</option>
                    <option value="returned">Returned</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
                
                
              </div>
            </div>
          )}

          {/* Content based on active tab */}
          {activeTab === 'borrowings' ? (
            /* Borrowings Table */
            <div className={`rounded-lg shadow-md overflow-hidden ${isDark ? "bg-gray-800" : "bg-white"}`}>
            {filteredBorrows.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className={`${isDark ? "bg-gray-700" : "bg-gray-50"}`}>
                    <tr>
                      <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                        Book
                      </th>
                      <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                        Student
                      </th>
                      <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                        Status
                      </th>
                      <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                        Dates
                      </th>
                      <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDark ? "divide-gray-700" : "divide-gray-200"}`}>
                    {filteredBorrows.map((borrow) => {
                      const book = borrow.book || {};
                      const user = borrow.user || {};
                      const daysRemaining = borrow.dueDate ? utils.getDaysRemaining(borrow.dueDate) : null;
                      const isOverdue = borrow.dueDate ? utils.isOverdue(borrow.dueDate) : false;
                      
                      return (
                        <tr key={borrow._id} className={isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={utils.getBookCoverUrl(book || {})}
                                alt={book?.title || "Book"}
                                className="w-10 h-14 object-cover rounded-lg mr-3"
                              />
                              <div>
                                <div className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                                  {book?.title || "Unknown Title"}
                                </div>
                                <div className={`text-xs ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                                  by {book?.author || "Unknown"}
                                </div>
                              </div>
                            </div>
                          </td>
                          
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className={`text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                              {user?.name || user?.username || "Unknown"}
                            </div>
                            <div className={`text-xs ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                              {user?.email || ""}
                            </div>
                          </td>
                          
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${utils.getStatusColor(borrow.status)}`}>
                              {utils.getStatusText(borrow.status)}
                            </span>
                            {daysRemaining !== null && (
                              <div className={`text-[10px] mt-1 ${
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
                          
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className={`text-xs ${isDark ? "text-gray-300" : "text-gray-500"}`}>
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
                          
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                            {borrow.status === 'reserved' && (
                              <button
                                onClick={() => handleConfirmCollection(borrow._id)}
                                disabled={actionLoading[borrow._id]}
                                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                                  actionLoading[borrow._id]
                                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700 text-white"
                                }`}
                              >
                                <FaCheck className="inline mr-1" />
                                {actionLoading[borrow._id] ? "Confirming..." : "Confirm"}
                              </button>
                            )}
                            {borrow.status === 'borrowed' && (
                              <span className="text-green-600 text-xs">
                                <FaCheck className="inline mr-1" />
                                Collected
                              </span>
                            )}
                            {borrow.status === 'return_requested' && (
                              <button
                                onClick={() => handleConfirmReturn(borrow._id)}
                                disabled={actionLoading[borrow._id]}
                                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                                  actionLoading[borrow._id]
                                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                    : "bg-purple-600 hover:bg-purple-700 text-white"
                                }`}
                              >
                                <FaCheck className="inline mr-1" />
                                {actionLoading[borrow._id] ? "Confirming..." : "Confirm Return"}
                              </button>
                            )}
                            {borrow.status === 'returned' && (
                              <span className="text-blue-600 text-xs">
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
          ) : (
            /* Payments Table */
            <div className={`rounded-lg shadow-md overflow-hidden ${isDark ? "bg-gray-800" : "bg-white"}`}>
              {paymentLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isDark ? "border-blue-400" : "border-blue-600"}`}></div>
                </div>
              ) : payments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className={`${isDark ? "bg-gray-700" : "bg-gray-50"}`}>
                      <tr>
                        <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                          User
                        </th>
                        <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                          Subscription Plan
                        </th>
                        <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                          Amount
                        </th>
                        <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                          Submitted
                        </th>
                        <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                          Payment Proof
                        </th>
                        <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isDark ? "divide-gray-700" : "divide-gray-200"}`}>
                      {payments.map((payment) => (
                        <tr key={payment.id} className={isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                              {payment.username}
                            </div>
                            <div className={`text-xs ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                              {payment.email}
                            </div>
                          </td>
                          
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className={`text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                              {payment.plan}
                            </div>
                          </td>
                          
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                              {payment.amount} ETB
                            </div>
                          </td>
                          
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className={`text-xs ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                              {new Date(payment.submittedAt).toLocaleDateString()}
                            </div>
                            <div className={`text-[10px] ${isDark ? "text-gray-400" : "text-gray-400"}`}>
                              {new Date(payment.submittedAt).toLocaleTimeString()}
                            </div>
                          </td>
                          
                          <td className="px-4 py-3 whitespace-nowrap">
                            {payment.paymentProof ? (
                              <button
                                onClick={() => {
                                  // In a real app, this would open the payment proof image
                                  toast.info("Payment proof available - would open in modal");
                                }}
                                className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                              >
                                <FaEye className="inline mr-1" />
                                View Proof
                              </button>
                            ) : (
                              <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                                No proof uploaded
                              </span>
                            )}
                          </td>
                          
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleApprovePayment(payment.id)}
                                disabled={actionLoading[payment.id]}
                                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                                  actionLoading[payment.id]
                                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700 text-white"
                                }`}
                              >
                                <FaCheckCircle className="inline mr-1" />
                                {actionLoading[payment.id] ? "Processing..." : "Approve"}
                              </button>
                              <button
                                onClick={() => handleRejectPayment(payment.id)}
                                disabled={actionLoading[payment.id]}
                                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                                  actionLoading[payment.id]
                                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                    : "bg-red-600 hover:bg-red-700 text-white"
                                }`}
                              >
                                <FaBan className="inline mr-1" />
                                {actionLoading[payment.id] ? "Processing..." : "Reject"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FaCreditCard className={`text-4xl mx-auto mb-4 ${isDark ? "text-gray-400" : "text-gray-300"}`} />
                  <h3 className={`text-lg font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                    No pending payments
                  </h3>
                  <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                    All membership payments have been processed.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Orders;
