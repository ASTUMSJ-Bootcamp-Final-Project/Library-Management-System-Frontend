import AdminSidebar from "@/components/AdminSidebar";
import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  FaBook,
  FaUsers,
  FaClipboardList,
  FaPlusCircle,
  FaChartLine,
  FaHistory,
  FaClock,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import borrowingHistory from "@/demo/borrowingHistory";

const stats = [
  {
    title: "Total Books",
    value: "1,245",
    icon: <FaBook className="text-blue-500" />,
    description: "Books available in the library",
    bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
  },
  {
    title: "Active Users",
    value: "312",
    icon: <FaUsers className="text-green-500" />,
    description: "Users currently registered",
    bgColor: "bg-gradient-to-br from-green-500 to-green-600",
  },
  {
    title: "Pending Orders",
    value: "7",
    icon: <FaClipboardList className="text-yellow-500" />,
    description: "Orders awaiting approval",
    bgColor: "bg-gradient-to-br from-yellow-500 to-yellow-600",
  },
  {
    title: "Current Users",
    value: "150",
    icon: <FaUsers className="text-purple-500" />,
    description: "Users currently online",
    bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
  },
];

const booksAddedData = [
  { month: "Jan", books: 40 },
  { month: "Feb", books: 55 },
  { month: "Mar", books: 32 },
  { month: "Apr", books: 60 },
  { month: "May", books: 48 },
  { month: "Jun", books: 70 },
];

const recentActivities = [
  {
    type: "Book Added",
    detail: 'Book "React Mastery" added',
    user: "Admin",
    date: "2025-08-19",
    status: "Completed",
    icon: <FaPlusCircle className="text-green-500" />,
  },
  {
    type: "Borrow",
    detail: 'User "Jane Doe" borrowed "JS Essentials"',
    user: "Jane Doe",
    date: "2025-08-18",
    status: "Borrowed",
    icon: <FaClock className="text-yellow-500" />,
  },
  {
    type: "Return",
    detail: 'User "John Smith" returned "Python Basics"',
    user: "John Smith",
    date: "2025-08-17",
    status: "Returned",
    icon: <FaCheckCircle className="text-blue-500" />,
  },
];

const quickActions = [
  {
    title: "Add New Book",
    description: "Add a new book to the library collection",
    icon: <FaPlusCircle className="text-2xl" />,
    link: "/admin/add-book",
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    title: "View Analytics",
    description: "Check detailed library analytics and reports",
    icon: <FaChartLine className="text-2xl" />,
    link: "/admin/analytics",
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    title: "Manage Users",
    description: "View and manage library users and permissions",
    icon: <FaUsers className="text-2xl" />,
    link: "/admin/users",
    color: "bg-purple-500 hover:bg-purple-600",
  },
];

const AdminDashboardModern = () => {
  const { isDark } = useTheme();

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";

    switch (status) {
      case "Returned":
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      case "Borrowed":
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
      case "Returned Late":
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
      case "Completed":
        return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200`;
    }
  };

  return (
    <div
      className={`flex flex-row min-h-screen ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <AdminSidebar />
      <main className="flex-1 px-6 py-6">
        <Navbar />

        {/* Header Section */}
        <div className="mb-8">
          <h1
            className={`text-3xl md:text-4xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            } mb-2`}
          >
            Welcome to ASTUMSJ Library Admin Dashboard
          </h1>
          <p
            className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            Manage your library system with ease and efficiency
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className={`shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                isDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } border-2 hover:border-blue-500`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${action.color} text-white`}>
                    {action.icon}
                  </div>
                  <FaArrowRight className="text-gray-400" />
                </div>
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {action.title}
                </h3>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {action.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className={`shadow-lg hover:shadow-xl transition-all duration-300 ${
                isDark ? "bg-gray-800" : "bg-white"
              } overflow-hidden`}
            >
              <div className={`${stat.bgColor} p-4 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="text-3xl opacity-80">{stat.icon}</div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm opacity-90">{stat.title}</div>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Books Added Chart */}
          <Card className={`shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <FaChartLine className="text-blue-500 text-xl" />
                <CardTitle className={isDark ? "text-white" : "text-black"}>
                  Books Added Per Month
                </CardTitle>
              </div>
              <CardDescription
                className={isDark ? "text-gray-300" : "text-gray-600"}
              >
                Track how many books are added monthly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={booksAddedData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={isDark ? "#374151" : "#e5e7eb"}
                  />
                  <XAxis
                    dataKey="month"
                    stroke={isDark ? "#9ca3af" : "#6b7280"}
                  />
                  <YAxis stroke={isDark ? "#9ca3af" : "#6b7280"} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? "#1f2937" : "#fff",
                      borderColor: isDark ? "#374151" : "#e5e7eb",
                      color: isDark ? "#fff" : "#000",
                    }}
                  />
                  <Bar dataKey="books" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className={`shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <FaHistory className="text-purple-500 text-xl" />
                <CardTitle className={isDark ? "text-white" : "text-black"}>
                  Recent Activity
                </CardTitle>
              </div>
              <CardDescription
                className={isDark ? "text-gray-300" : "text-gray-600"}
              >
                Latest actions in the library system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                      isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex-shrink-0">{activity.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-medium text-sm ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {activity.detail}
                      </p>
                      <p
                        className={`text-xs ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {activity.user} • {activity.date}
                      </p>
                    </div>
                    <span className={getStatusBadge(activity.status)}>
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Borrowing History */}
        <Card
          className={`shadow-lg mb-8 ${isDark ? "bg-gray-800" : "bg-white"}`}
        >
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <FaBook className="text-green-500 text-xl" />
              <CardTitle className={isDark ? "text-white" : "text-black"}>
                Borrowing History
              </CardTitle>
            </div>
            <CardDescription
              className={isDark ? "text-gray-300" : "text-gray-600"}
            >
              Complete history of all book borrowings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className={isDark ? "text-white" : "text-black"}>
                    User
                  </TableHead>
                  <TableHead className={isDark ? "text-white" : "text-black"}>
                    Book
                  </TableHead>
                  <TableHead className={isDark ? "text-white" : "text-black"}>
                    Borrow Date
                  </TableHead>
                  <TableHead className={isDark ? "text-white" : "text-black"}>
                    Due Date
                  </TableHead>
                  <TableHead className={isDark ? "text-white" : "text-black"}>
                    Status
                  </TableHead>
                  <TableHead className={isDark ? "text-white" : "text-black"}>
                    Fine
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {borrowingHistory.map((history) => (
                  <TableRow
                    key={history.id}
                    className={`transition-colors ${
                      isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"
                    }`}
                  >
                    <TableCell
                      className={isDark ? "text-gray-300" : "text-gray-800"}
                    >
                      {history.userName}
                    </TableCell>
                    <TableCell
                      className={isDark ? "text-gray-300" : "text-gray-800"}
                    >
                      {history.bookTitle}
                    </TableCell>
                    <TableCell
                      className={isDark ? "text-gray-300" : "text-gray-800"}
                    >
                      {history.borrowDate}
                    </TableCell>
                    <TableCell
                      className={isDark ? "text-gray-300" : "text-gray-800"}
                    >
                      {history.dueDate}
                    </TableCell>
                    <TableCell>
                      <span className={getStatusBadge(history.status)}>
                        {history.status}
                      </span>
                    </TableCell>
                    <TableCell
                      className={isDark ? "text-gray-300" : "text-gray-800"}
                    >
                      ${history.fineAmount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Footer />
      </main>
    </div>
  );
};

export default AdminDashboardModern;
