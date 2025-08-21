import AdminSidebar from "@/components/AdminSidebar";
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
import { FaBook, FaUsers, FaClipboardList, FaCog } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stats = [
  {
    title: "Total Books",
    value: "1,245",
    icon: <FaBook className="text-blue-500" />,
    description: "Books available in the library",
  },
  {
    title: "Active Users",
    value: "312",
    icon: <FaUsers className="text-gray-500" />,
    description: "Users currently registered",
  },
  {
    title: "Pending Orders",
    value: "7",
    icon: <FaClipboardList className="text-yellow-500" />,
    description: "Orders awaiting approval",
  },
  {
    title: "Current Users",
    value: "150",
    icon: <FaUsers className="text-green-500" />,
    description: "Users currently online",
  },
];

// Example chart data
const booksAddedData = [
  { month: "Jan", books: 40 },
  { month: "Feb", books: 55 },
  { month: "Mar", books: 32 },
  { month: "Apr", books: 60 },
  { month: "May", books: 48 },
  { month: "Jun", books: 70 },
];

// Example recent activities
const recentActivities = [
  {
    type: "Book Added",
    detail: 'Book "React Mastery" added',
    user: "Admin",
    date: "2025-08-19",
    status: "Completed",
  },
  {
    type: "Borrow",
    detail: 'User "Jane Doe" borrowed "JS Essentials"',
    user: "Jane Doe",
    date: "2025-08-18",
    status: "Borrowed",
  },
  {
    type: "Return",
    detail: 'User "John Smith" returned "Python Basics"',
    user: "John Smith",
    date: "2025-08-17",
    status: "Returned",
  },
  {
    type: "Book Added",
    detail: 'Book "Node.js in Action" added',
    user: "Admin",
    date: "2025-08-16",
    status: "Completed",
  },
];

const AdminDashboard = () => {
  return (
    <div className="flex flex-row min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 px-6 py-3">
        <Navbar />
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-4 text-center drop-shadow-lg tracking-tight">
          <span className="inline-block bg-gradient-to-r from-blue-700 via-blue-400 to-blue-700 bg-clip-text text-transparent">
            Welcome to ASTUMSJ Library Admin Dashboard
          </span>
        </h1>
        <p className="text-gray-600 mb-8">
          Welcome to the Admin Dashboard. Check the latest stats and activities.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className="shadow-md hover:shadow-lg transition-shadow"
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="text-3xl">{stat.icon}</div>
                <div>
                  <CardTitle>{stat.title}</CardTitle>
                  <CardDescription>{stat.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                {stat.value && (
                  <span className="text-2xl font-bold text-gray-800">
                    {stat.value}
                  </span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Books Added Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Books Added Per Month</CardTitle>
            <CardDescription>
              Track how many books are added monthly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={booksAddedData}>
                <XAxis dataKey="month" />
                <YAxis dataKey="books" />
                <Tooltip />
                <Bar dataKey="books" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest actions in the library system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Detail</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivities.map((activity, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{activity.type}</TableCell>
                    <TableCell>{activity.detail}</TableCell>
                    <TableCell>{activity.user}</TableCell>
                    <TableCell>{activity.date}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          activity.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : activity.status === "Borrowed"
                            ? "bg-yellow-100 text-yellow-700"
                            : activity.status === "Returned"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {activity.status}
                      </span>
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

export default AdminDashboard;
