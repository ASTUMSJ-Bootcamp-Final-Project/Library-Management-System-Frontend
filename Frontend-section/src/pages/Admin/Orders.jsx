import AdminSidebar from "@/components/AdminSidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

const Orders = () => {
  return (
    <div className="flex flex-row min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 px-6 py-3">
        <Navbar />
        <h1 className="text-3xl font-bold text-blue-600">Manage Orders</h1>
        {/* Add order management form or table here */}
        <div className="h-screen flex items-center justify-center">
          {/* Order management section */}
          <p className="text-gray-500">
            Order management functionality will be implemented here.
          </p>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Orders;
