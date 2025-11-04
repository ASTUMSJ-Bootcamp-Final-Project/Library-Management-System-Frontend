import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StudentSidebar from "@/components/StudentSidebar";
import StudentNavbar from "@/components/StudentNavbar";
import Footer from "@/components/Footer";
import NotificationCard from "@/components/NotificationCard";
import { useTheme } from "@/contexts/ThemeContext";
import {
  FaBell,
  FaBook,
  FaCreditCard,
  FaCalendarAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimes,
  FaFilter,
} from "react-icons/fa";
import logo from "@/assets/logo.jpg";

const Notifications = () => {
  const { isDark } = useTheme();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Mock notifications data - in real app, this would come from API
  const mockNotifications = [
    {
      id: 1,
      type: "borrowing",
      title: "Book Due Soon",
      message:
        'Your borrowed book "Introduction to Algorithms" is due in 2 days.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      priority: "high",
      icon: <FaBook className="text-blue-500" />,
    },
    {
      id: 2,
      type: "payment",
      title: "Payment Successful",
      message:
        "Your membership renewal payment of $25.00 has been processed successfully.",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
      priority: "medium",
      icon: <FaCreditCard className="text-green-500" />,
    },
    {
      id: 3,
      type: "borrowing",
      title: "Book Returned",
      message:
        'You have successfully returned "Data Structures and Algorithms".',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      read: true,
      priority: "low",
      icon: <FaCheckCircle className="text-green-500" />,
    },
    {
      id: 4,
      type: "system",
      title: "Library Hours Update",
      message:
        "Library hours have been extended. Now open until 10 PM on weekdays.",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      read: false,
      priority: "medium",
      icon: <FaInfoCircle className="text-purple-500" />,
    },
    {
      id: 5,
      type: "borrowing",
      title: "Overdue Notice",
      message:
        'Your book "Machine Learning Basics" is now overdue. Please return it immediately.',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      read: false,
      priority: "high",
      icon: <FaExclamationTriangle className="text-red-500" />,
    },
    {
      id: 6,
      type: "payment",
      title: "Payment Reminder",
      message:
        "Your membership expires in 5 days. Renew now to avoid service interruption.",
      timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      read: true,
      priority: "high",
      icon: <FaCalendarAlt className="text-orange-500" />,
    },
  ];

  useEffect(() => {
    // Simulate API call
    const fetchNotifications = async () => {
      setLoading(true);
      // In real app: const response = await notificationAPI.getNotifications();
      setTimeout(() => {
        setNotifications(mockNotifications);
        setLoading(false);
      }, 1000);
    };

    fetchNotifications();
  }, []);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notif.read;
    return notif.type === filter;
  });

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div
      className={`flex min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <StudentSidebar />
      <main className="flex-1 p-5 md:p-6">
        <StudentNavbar />

        {/* Header Section */}
        <div className="mb-6 pt-6 md:pt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl">
                <FaBell className="text-white text-xl" />
              </div>
              <div>
                <h1
                  className={`text-2xl md:text-3xl font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Notifications
                </h1>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Stay updated with your library activities
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                Mark All Read ({unreadCount})
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div
            className={`flex flex-wrap gap-2 p-1 rounded-lg ${
              isDark ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            {[
              { key: "all", label: "All", count: notifications.length },
              { key: "unread", label: "Unread", count: unreadCount },
              {
                key: "borrowing",
                label: "Borrowing",
                count: notifications.filter((n) => n.type === "borrowing")
                  .length,
              },
              {
                key: "payment",
                label: "Payments",
                count: notifications.filter((n) => n.type === "payment").length,
              },
              {
                key: "system",
                label: "System",
                count: notifications.filter((n) => n.type === "system").length,
              },
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center space-x-2 ${
                  filter === key
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <span>{label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    filter === key
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                      : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Notifications Grid */}
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Loading notifications...
            </p>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="p-12 text-center">
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
              <FaBell className="text-gray-400 text-3xl" />
            </div>
            <h3
              className={`text-lg font-semibold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              No notifications found
            </h3>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {filter === "all"
                ? "You're all caught up!"
                : `No ${filter} notifications at the moment.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotifications.map((notification, index) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                index={index}
                onMarkAsRead={markAsRead}
                onDelete={deleteNotification}
                getTimeAgo={getTimeAgo}
              />
            ))}
          </div>
        )}

        <Footer />
      </main>
    </div>
  );
};

export default Notifications;
