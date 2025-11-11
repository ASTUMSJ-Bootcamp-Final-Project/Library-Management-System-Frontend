import React, { useEffect, useMemo, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import AdminSidebar from "@/components/AdminSidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fineAPI, utils } from "@/services/api";
import toast from "react-hot-toast";
import {
  FaCheck,
  FaExclamationTriangle,
  FaEye,
  FaRedo,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-t ${active ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"}`}
  >
    {children}
  </button>
);

const ManageFines = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState("fines"); // 'fines' | 'payments'

  // Fines
  const [fines, setFines] = useState([]);
  const [finesPage, setFinesPage] = useState(1);
  const [finesTotalPages, setFinesTotalPages] = useState(1);
  const [finesLoading, setFinesLoading] = useState(true);

  // Payments
  const [payments, setPayments] = useState([]);
  const [paymentsPage, setPaymentsPage] = useState(1);
  const [paymentsTotalPages, setPaymentsTotalPages] = useState(1);
  const [paymentsLoading, setPaymentsLoading] = useState(true);
  const [paymentsTab, setPaymentsTab] = useState("requests"); // 'requests' | 'history'
  const [actionId, setActionId] = useState(null);

  // Stats
  const stats = useMemo(() => {
    const unpaid = Array.isArray(fines) ? fines.filter((f) => !f.isPaid).length : 0;
    const paid = Array.isArray(fines) ? fines.filter((f) => f.isPaid).length : 0;
    const totalAmount = fines.reduce((s, f) => s + (f.amount || 0), 0);
    const paidAmount = (Array.isArray(payments) ? payments : [])
      .filter((p) => p.status === "approved")
      .reduce((s, p) => s + (p.totalAmount || 0), 0);
    return { unpaid, paid, totalAmount, paidAmount };
  }, [fines, payments]);

  const filteredPayments = useMemo(() => {
    const list = Array.isArray(payments) ? payments : [];
    if (paymentsTab === "requests") {
      return list.filter((p) => p.status === "waiting_for_approval" || p.status === "pending");
    }
    return list.filter((p) => p.status === "approved" || p.status === "rejected");
  }, [payments, paymentsTab]);

  useEffect(() => {
    loadFines(finesPage);
  }, [finesPage]);

  useEffect(() => {
    loadPayments(paymentsPage);
  }, [paymentsPage]);

  const loadFines = async (p) => {
    try {
      setFinesLoading(true);
      const res = await fineAPI.getAllFines(p, 10);
      setFines(res.data?.fines || res.data?.data || res.data || []);
      setFinesTotalPages(res.data?.totalPages || 1);
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to load fines");
    } finally {
      setFinesLoading(false);
    }
  };

  const loadPayments = async (p) => {
    try {
      setPaymentsLoading(true);
      const res = await fineAPI.getAllFinePayments(p, 10);
      // Backend returns { finePayments, pagination: { totalPages, ... } }
      const list = res.data?.finePayments || res.data?.payments || res.data?.data || res.data || [];
      setPayments(Array.isArray(list) ? list : []);
      setPaymentsTotalPages(res.data?.pagination?.totalPages || res.data?.totalPages || 1);
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to load payments");
    } finally {
      setPaymentsLoading(false);
    }
  };

  const approve = async (id) => {
    setActionId(id);
    try {
      await fineAPI.approveFinePayment(id);
      toast.success("Payment approved");
      await loadPayments(paymentsPage);
    } catch (e) {
      toast.error(e.response?.data?.message || "Approve failed");
    } finally {
      setActionId(null);
    }
  };

  const reject = async (id) => {
    const reason = prompt("Enter rejection reason (optional):") || "";
    setActionId(id);
    try {
      await fineAPI.rejectFinePayment(id, reason);
      toast.success("Payment rejected");
      await loadPayments(paymentsPage);
    } catch (e) {
      toast.error(e.response?.data?.message || "Reject failed");
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1">
          <Navbar />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Header */}
            <div className="mb-6">
              <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                Manage Fines
              </h1>
              <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                Review fines and approve/reject fine payments.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className={`p-4 rounded-lg border-l-4 border-red-500 ${isDark ? "bg-gray-800" : "bg-red-50"}`}>
                <div className="text-sm">Unpaid Fines</div>
                <div className="text-2xl font-bold">{stats.unpaid}</div>
              </div>
              <div className={`p-4 rounded-lg border-l-4 border-green-500 ${isDark ? "bg-gray-800" : "bg-green-50"}`}>
                <div className="text-sm">Paid Fines</div>
                <div className="text-2xl font-bold">{stats.paid}</div>
              </div>
              <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${isDark ? "bg-gray-800" : "bg-blue-50"}`}>
                <div className="text-sm">Total Fine Amount</div>
                <div className="text-2xl font-bold">{stats.totalAmount.toFixed(2)}</div>
              </div>
              <div className={`p-4 rounded-lg border-l-4 border-purple-500 ${isDark ? "bg-gray-800" : "bg-purple-50"}`}>
                <div className="text-sm">Approved Payments</div>
                <div className="text-2xl font-bold">{stats.paidAmount.toFixed(2)}</div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-2 mb-0">
              <TabButton active={activeTab === "fines"} onClick={() => setActiveTab("fines")}>
                Fines
              </TabButton>
              <TabButton active={activeTab === "payments"} onClick={() => setActiveTab("payments")}>
                Payments
              </TabButton>
            </div>
            <div className={`rounded-b-lg rounded-tr-lg p-4 ${isDark ? "bg-gray-800" : "bg-white"} shadow`}>
              {activeTab === "fines" ? (
                finesLoading ? (
                  <div className="p-6 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto" />
                  </div>
                ) : fines.length === 0 ? (
                  <div className="p-6 text-center">
                    <FaExclamationTriangle className="mx-auto text-yellow-500 text-2xl mb-2" />
                    <div className={isDark ? "text-gray-300" : "text-gray-700"}>
                      No fines found
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead className={isDark ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-700"}>
                        <tr>
                          <th className="text-left px-4 py-2">User</th>
                          <th className="text-left px-4 py-2">Book</th>
                          <th className="text-left px-4 py-2">Amount</th>
                          <th className="text-left px-4 py-2">Reason</th>
                          <th className="text-left px-4 py-2">Created</th>
                          <th className="text-left px-4 py-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className={isDark ? "divide-y divide-gray-700" : "divide-y divide-gray-200"}>
                        {fines.map((f) => (
                          <tr key={f._id}>
                            <td className="px-4 py-2">{f.user?.name || f.user?.email || "-"}</td>
                            <td className="px-4 py-2">{f.book?.title || "-"}</td>
                            <td className="px-4 py-2">{Number(f.amount || 0).toFixed(2)}</td>
                            <td className="px-4 py-2">{f.reason || f.type || "-"}</td>
                            <td className="px-4 py-2">{f.createdAt ? utils.formatDateTime(f.createdAt) : "-"}</td>
                            <td className="px-4 py-2">
                              {f.isPaid ? (
                                <span className="px-2 py-0.5 text-xs rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                  Paid
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 text-xs rounded bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                  Unpaid
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              ) : paymentsLoading ? (
                <div className="p-6 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto" />
                </div>
              ) : filteredPayments.length === 0 ? (
                <div className="p-6 text-center">
                  <FaExclamationTriangle className="mx-auto text-yellow-500 text-2xl mb-2" />
                  <div className={isDark ? "text-gray-300" : "text-gray-700"}>
                    No payments found
                  </div>
                </div>
              ) : (
                <>
                  {/* Sub-tabs for payments */}
                  <div className="flex space-x-2 mb-3">
                    <TabButton active={paymentsTab === "requests"} onClick={() => setPaymentsTab("requests")}>
                      Requests
                    </TabButton>
                    <TabButton active={paymentsTab === "history"} onClick={() => setPaymentsTab("history")}>
                      History
                    </TabButton>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead className={isDark ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-700"}>
                        <tr>
                          <th className="text-left px-4 py-2">User</th>
                          <th className="text-left px-4 py-2">Fines</th>
                          <th className="text-left px-4 py-2">Total</th>
                          <th className="text-left px-4 py-2">Copy No.</th>
                          {paymentsTab === "history" && <th className="text-left px-4 py-2">Reason</th>}
                          <th className="text-left px-4 py-2">Status</th>
                          <th className="text-left px-4 py-2">Proof</th>
                          <th className="text-left px-4 py-2">Submitted</th>
                          <th className="text-left px-4 py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody className={isDark ? "divide-y divide-gray-700" : "divide-y divide-gray-200"}>
                        {filteredPayments.map((p) => (
                          <tr key={p._id}>
                            <td className="px-4 py-2">{p.user?.name || p.user?.email || "-"}</td>
                            <td className="px-4 py-2">{p.fines?.length || 0}</td>
                            <td className="px-4 py-2">{Number(p.totalAmount || 0).toFixed(2)}</td>
                            <td className="px-4 py-2">{p.copyNumber || "-"}</td>
                            {paymentsTab === "history" && (
                              <td className="px-4 py-2">{p.status === "rejected" ? (p.rejectedReason || "No reason provided") : "-"}</td>
                            )}
                            <td className="px-4 py-2">
                              <span className={`px-2 py-0.5 text-xs rounded ${
                                p.status === "approved"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : p.status === "rejected"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              }`}>
                                {p.status?.replaceAll("_", " ")}
                              </span>
                            </td>
                            <td className="px-4 py-2">
                              {p.proof?.url ? (
                                <a
                                  className="inline-flex items-center text-blue-600 hover:underline"
                                  href={p.proof.url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <FaEye className="mr-1" /> View
                                </a>
                              ) : (
                                <span className={isDark ? "text-gray-400" : "text-gray-500"}>-</span>
                              )}
                            </td>
                            <td className="px-4 py-2">{p.submittedAt ? utils.formatDateTime(p.submittedAt) : "-"}</td>
                            <td className="px-4 py-2">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => approve(p._id)}
                                  disabled={actionId === p._id || p.status === "approved" || paymentsTab !== "requests"}
                                  className={`px-3 py-1 rounded text-white ${actionId === p._id || p.status === "approved" || paymentsTab !== "requests"
                                      ? "bg-green-400 cursor-not-allowed"
                                      : "bg-green-600 hover:bg-green-700"
                                    }`}
                                  title="Approve"
                                >
                                  <FaCheck />
                                </button>
                                <button
                                  onClick={() => reject(p._id)}
                                  disabled={actionId === p._id || p.status === "rejected" || paymentsTab !== "requests"}
                                  className={`px-3 py-1 rounded text-white ${actionId === p._id || p.status === "rejected" || paymentsTab !== "requests"
                                      ? "bg-red-400 cursor-not-allowed"
                                      : "bg-red-600 hover:bg-red-700"
                                    }`}
                                  title="Reject"
                                >
                                  <FaTimes />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ManageFines;


