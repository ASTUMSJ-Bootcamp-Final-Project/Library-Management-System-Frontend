import AdminSidebar from "@/components/AdminSidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

const ManageUsers = () => {
  return (
    <div className="flex flex-row min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 px-6 py-3">
        <Navbar />
        <h1 className="text-3xl font-bold text-blue-600">Manage Users</h1>
        {/* Add user management form or table here */}
        <div className="h-screen flex items-center justify-center">
          <p className="text-gray-500">
            User management functionality will be implemented here.
          </p>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default ManageUsers;
