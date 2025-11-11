import React, { useEffect, useMemo, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import StudentSidebar from "@/components/StudentSidebar";
import StudentNavbar from "@/components/StudentNavbar";
import Footer from "@/components/Footer";
import { fineAPI, utils } from "@/services/api";
import toast from "react-hot-toast";
import {
  FaCheckCircle,
  FaCopy,
  FaExclamationTriangle,
  FaFileUpload,
  FaMoneyBillWave,
  FaTimes,
} from "react-icons/fa";

const BANK_ACCOUNT_NUMBER = "100012345678"; // CBE account number

const MyFines = () => {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fines, setFines] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Payment history
  const [paymentsLoading, setPaymentsLoading] = useState(true);
  const [paymentsError, setPaymentsError] = useState(null);
  const [payments, setPayments] = useState([]);
  const [paymentsPage, setPaymentsPage] = useState(1);
  const [paymentsTotalPages, setPaymentsTotalPages] = useState(1);

  const [selected, setSelected] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalProofFile, setModalProofFile] = useState(null);

  const selectedIds = useMemo(
    () => Object.entries(selected).filter(([_, v]) => v).map(([k]) => k),
    [selected]
  );
  const selectedTotal = useMemo(() => {
    const map = fines.reduce((acc, f) => ({ ...acc, [f._id]: f.amount }), {});
    return selectedIds.reduce((sum, id) => sum + (map[id] || 0), 0);
  }, [fines, selectedIds]);

  useEffect(() => {
    loadFines(page);
  }, [page]);

  useEffect(() => {
    loadPayments(paymentsPage);
  }, [paymentsPage]);

  const loadFines = async (p) => {
    try {
      setLoading(true);
      const res = await fineAPI.getMyFines(p, 10);
      setFines(res.data?.fines || res.data?.data || res.data || []);
      setTotalPages(res.data?.totalPages || 1);
      setError(null);
    } catch (e) {
      setError(e.response?.data?.message || "Failed to load fines");
    } finally {
      setLoading(false);
    }
  };

  const loadPayments = async (p) => {
    try {
      setPaymentsLoading(true);
      const res = await fineAPI.getMyFinePayments(p, 10);
      // Controller returns { finePayments, pagination: { totalPages, ... } }
      const list = res.data?.finePayments || res.data?.data || res.data || [];
      const tp =
        res.data?.pagination?.totalPages ??
        res.data?.totalPages ??
        1;
      setPayments(list);
      setPaymentsTotalPages(tp);
      setPaymentsError(null);
    } catch (e) {
      setPaymentsError(e.response?.data?.message || "Failed to load payment history");
    } finally {
      setPaymentsLoading(false);
    }
  };

  const toggleSelect = (id) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selectAll = (value) => {
    const next = {};
    fines.forEach((f) => (next[f._id] = value));
    setSelected(next);
  };

  const handleCopyAccount = async () => {
    try {
      await navigator.clipboard.writeText(BANK_ACCOUNT_NUMBER);
      toast.success("Bank account copied");
    } catch {
      toast.error("Copy failed");
    }
  };

  const openPaymentModal = () => {
    if (selectedIds.length === 0) {
      toast.error("Select at least one fine to pay");
      return;
    }
    setModalProofFile(null);
    setShowModal(true);
  };

  const handleSubmitPayment = async () => {
    setSubmitting(true);
    try {
      await fineAPI.submitFinePayment({
        fineIds: selectedIds,
        paymentProof: modalProofFile || undefined,
        bankAccountNumber: BANK_ACCOUNT_NUMBER,
        // Backend requires copyNumber; user requested to remove input
        // Send placeholder value
        copyNumber: "N/A",
      });
      toast.success("Payment submitted for approval");
      setSelected({});
      setShowModal(false);
      await loadFines(page);
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to submit payment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    <div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="flex">
        <StudentSidebar />
        <div className="flex-1">
          <StudentNavbar />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="mb-6">
              <h1
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                My Fines
              </h1>
              <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                View outstanding fines and submit payment proof for approval.
              </p>
            </div>

            {/* Instructions removed per request; moved to modal */}

            {/* Fines List */}
            <div
              className={`rounded-lg shadow ${
                isDark ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    onChange={(e) => selectAll(e.target.checked)}
                    className="h-4 w-4"
                    checked={
                      fines.length > 0 &&
                      fines.every((f) => selected[f._id])
                    }
                    aria-label="Select all"
                  />
                  <span className={isDark ? "text-white" : "text-gray-900"}>
                    Outstanding Fines
                  </span>
                </div>
                <div className={isDark ? "text-gray-300" : "text-gray-600"}>
                  Selected: {selectedIds.length} | Total:{" "}
                  <span className="font-semibold">
                    {selectedTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {loading ? (
                <div className="p-6 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto" />
                </div>
              ) : error ? (
                <div className="p-6 text-center">
                  <FaExclamationTriangle className="mx-auto text-red-500 text-2xl mb-2" />
                  <div className={isDark ? "text-red-300" : "text-red-600"}>
                    {error}
                  </div>
                </div>
              ) : fines.length === 0 ? (
                <div className="p-6 text-center">
                  <FaCheckCircle className="mx-auto text-green-500 text-2xl mb-2" />
                  <div className={isDark ? "text-gray-300" : "text-gray-700"}>
                    No outstanding fines 🎉
                  </div>
                </div>
              ) : (
                <ul className="divide-y dark:divide-gray-700">
                  {fines.map((fine) => (
                    <li key={fine._id} className="p-4 flex items-start">
                      <input
                        type="checkbox"
                        className="h-4 w-4 mt-1 mr-3"
                        checked={!!selected[fine._id]}
                        onChange={() => toggleSelect(fine._id)}
                      />
                      <div className="flex-1">
                        <div
                          className={`flex items-center justify-between mb-1 ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          <div className="font-medium">
                            {fine.book?.title || "Book"}
                          </div>
                          <div className="font-semibold">
                            {Number(fine.amount || 0).toFixed(2)}
                          </div>
                        </div>
                        <div className={isDark ? "text-gray-300" : "text-gray-600"}>
                          Reason: {fine.reason || fine.type || "Fine"}
                        </div>
                        {fine.createdAt && (
                          <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            Issued: {utils.formatDateTime(fine.createdAt)}
                          </div>
                        )}
                        {fine.isPaid && (
                          <span className="mt-2 inline-block text-xs px-2 py-0.5 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Paid
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {/* Actions */}
              {selectedIds.length > 0 && (
                <div className="p-4 border-t dark:border-gray-700 flex justify-end">
                  <button
                    onClick={openPaymentModal}
                    className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <FaMoneyBillWave className="inline mr-2" />
                    Pay Selected
                  </button>
                </div>
              )}
            </div>

            {/* Pagination for fines */}
            <div className="mt-4 flex justify-center items-center space-x-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className={`px-3 py-1 rounded ${page <= 1 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-gray-300 hover:bg-gray-400 text-gray-800"} dark:${page <= 1 ? "bg-gray-700 text-gray-400" : "bg-gray-600 hover:bg-gray-500 text-gray-100"}`}
              >
                Prev
              </button>
              <span className={isDark ? "text-gray-300" : "text-gray-700"}>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
                disabled={page >= totalPages}
                className={`px-3 py-1 rounded ${page >= totalPages ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-gray-300 hover:bg-gray-400 text-gray-800"} dark:${page >= totalPages ? "bg-gray-700 text-gray-400" : "bg-gray-600 hover:bg-gray-500 text-gray-100"}`}
              >
                Next
              </button>
            </div>

            {/* Payment History */}
            <div className={`mt-8 rounded-lg shadow ${isDark ? "bg-gray-800" : "bg-white"}`}>
              <div className="p-4 border-b dark:border-gray-700">
                <span className={isDark ? "text-white" : "text-gray-900"}>
                  Payment History
                </span>
              </div>
              {paymentsLoading ? (
                <div className="p-6 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto" />
                </div>
              ) : paymentsError ? (
                <div className="p-6 text-center">
                  <FaExclamationTriangle className="mx-auto text-red-500 text-2xl mb-2" />
                  <div className={isDark ? "text-red-300" : "text-red-600"}>
                    {paymentsError}
                  </div>
                </div>
              ) : payments.length === 0 ? (
                <div className="p-6 text-center">
                  <div className={isDark ? "text-gray-300" : "text-gray-700"}>
                    No payment history
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className={isDark ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-700"}>
                      <tr>
                        <th className="text-left px-4 py-2">Fines</th>
                        <th className="text-left px-4 py-2">Total</th>
                        <th className="text-left px-4 py-2">Copy No.</th>
                        <th className="text-left px-4 py-2">Reason</th>
                        <th className="text-left px-4 py-2">Status</th>
                        <th className="text-left px-4 py-2">Proof</th>
                        <th className="text-left px-4 py-2">Submitted</th>
                      </tr>
                    </thead>
                    <tbody className={isDark ? "divide-y divide-gray-700" : "divide-y divide-gray-200"}>
                      {payments.map((p) => (
                        <tr key={p._id}>
                          <td className="px-4 py-2">{p.fines?.length || 0}</td>
                          <td className="px-4 py-2">{Number(p.totalAmount || 0).toFixed(2)}</td>
                          <td className="px-4 py-2">{p.copyNumber || "-"}</td>
                          <td className="px-4 py-2">
                            {p.status === "rejected" ? (p.rejectedReason || "No reason provided") : "-"}
                          </td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-0.5 text-xs rounded ${
                              p.status === "approved"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : p.status === "rejected"
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            }`}>
                              {p.status?.replaceAll?.("_", " ") || p.status}
                            </span>
                          </td>
                          <td className="px-4 py-2">
                            {p.proof?.url ? (
                              <a
                                className="text-blue-600 hover:underline"
                                href={p.proof.url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                View
                              </a>
                            ) : (
                              <span className={isDark ? "text-gray-400" : "text-gray-500"}>-</span>
                            )}
                          </td>
                          <td className="px-4 py-2">{p.submittedAt ? utils.formatDateTime(p.submittedAt) : "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {/* Pagination for payment history */}
              <div className="p-4 border-t dark:border-gray-700 flex justify-center items-center space-x-2">
                <button
                  onClick={() => setPaymentsPage((p) => Math.max(1, p - 1))}
                  disabled={paymentsPage <= 1}
                  className={`px-3 py-1 rounded ${paymentsPage <= 1 ? "bg-gray-2 00 text-gray-500 cursor-not-allowed" : "bg-gray-300 hover:bg-gray-400 text-gray-800"} dark:${paymentsPage <= 1 ? "bg-gray-700 text-gray-400" : "bg-gray-600 hover:bg-gray-500 text-gray-100"}`}
                >
                  Prev
                </button>
                <span className={isDark ? "text-gray-300" : "text-gray-700"}>
                  Page {paymentsPage} of {paymentsTotalPages}
                </span>
                <button
                  onClick={() => setPaymentsPage((p) => (p < paymentsTotalPages ? p + 1 : p))}
                  disabled={paymentsPage >= paymentsTotalPages}
                  className={`px-3 py-1 rounded ${paymentsPage >= paymentsTotalPages ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-gray-300 hover:bg-gray-400 text-gray-800"} dark:${paymentsPage >= paymentsTotalPages ? "bg-gray-700 text-gray-400" : "bg-gray-600 hover:bg-gray-500 text-gray-100"}`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
    <MyFinesPaymentModal
      key="payment-modal"
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      onSubmit={handleSubmitPayment}
      isSubmitting={submitting}
      isDark={isDark}
      accountNumber={BANK_ACCOUNT_NUMBER}
      copyAccount={handleCopyAccount}
      totalAmount={selectedTotal}
      proofFile={modalProofFile}
      setProofFile={setModalProofFile}
    />
    </>
  );
};

export default MyFines;

// Modal
// Render below to avoid interfering with layout
// Using same file for simplicity
export const MyFinesPaymentModal = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  isDark,
  accountNumber,
  copyAccount,
  totalAmount,
  proofFile,
  setProofFile,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className={`relative w-full max-w-lg mx-4 rounded-lg shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}>
        <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
          <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Submit Fine Payment</h3>
          <button onClick={onClose} className={`${isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>
            <FaTimes />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div className={isDark ? "text-gray-300" : "text-gray-700"}>
            Please transfer the total to the CBE account below, then enter your copy number and optionally upload proof.
          </div>
          <div className={`p-3 rounded border ${isDark ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-50"}`}>
            <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Total to Pay</div>
            <div className={`mt-1 text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              {Number(totalAmount || 0).toFixed(2)}
            </div>
          </div>
          <div className={`p-3 rounded border ${isDark ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-50"}`}>
            <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>CBE Account Number</div>
            <div className="flex items-center justify-between mt-1">
              <div className="font-mono font-semibold">{accountNumber}</div>
              <button
                onClick={copyAccount}
                className="inline-flex items-center px-2 py-1 text-xs rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                <FaCopy className="mr-1" /> Copy
              </button>
            </div>
          </div>
          <div>
            <label className={`block text-sm mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Payment Proof (optional)
            </label>
            <div className="flex items-center">
              <label className="inline-flex items-center px-3 py-2 rounded border cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                <FaFileUpload className="mr-2" />
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                />
              </label>
              {proofFile && <span className="ml-3 text-sm">{proofFile.name}</span>}
            </div>
          </div>
        </div>
        <div className="p-4 border-t dark:border-gray-700 flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className={`px-4 py-2 rounded ${isDark ? "bg-gray-700 hover:bg-gray-600 text-gray-200" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className={`px-4 py-2 rounded text-white ${isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {isSubmitting ? "Submitting..." : "Submit Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};


