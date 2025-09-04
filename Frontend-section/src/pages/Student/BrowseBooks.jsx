import React from "react";
import StudentSidebar from "@/components/StudentSidebar";
import StudentNavbar from "@/components/StudentNavbar";
import Footer from "@/components/Footer";
import BookList from "./BookListEnhanced";
import { useTheme } from "@/contexts/ThemeContext";

const BrowseBooks = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`flex min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <StudentSidebar />
      <main className="flex-1 p-6">
        <StudentNavbar />

        {/* Header Section */}
        <div className="mb-8">
          <h1
            className={`text-3xl md:text-3xl font-bold ${
              isDark ? "text-white" : "text-blue-600"
            } mb-2 py-5` }
            style={{ fontFamily: "Bebas_Neue" }}

          >
            BROWSE BOOKS
          </h1>
          <p
            className={`text-md ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            Explore our extensive collection of books
          </p>
        </div>

        {/* Book List Component */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <BookList />
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default BrowseBooks;
