import React, { useState, useMemo } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import books from "@/demo/Bookdata";
import StudentBookCard from "@/components/StudentBookCard";
import { FaSearch, FaFilter, FaSort } from "react-icons/fa";
import { Link } from "react-router-dom";

const BookListEnhanced = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("title");
  const { isDark } = useTheme();

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    let filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
    );

    if (statusFilter !== "all") {
      filtered = filtered.filter((book) => book.status === statusFilter);
    }

    // Sort books
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "author":
          aValue = a.author.toLowerCase();
          bValue = b.author.toLowerCase();
          break;
        case "available":
          aValue = a.totalAmount - a.borrowed;
          bValue = b.totalAmount - b.borrowed;
          break;
        default:
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
      }

      return aValue > bValue ? 1 : -1;
    });

    return filtered;
  }, [search, statusFilter, sortBy]);

  const handleBorrowBook = (bookId) => {
    // Mock borrow functionality
    alert(`Book ${bookId} borrowed successfully!`);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2
          className={`text-2xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          } mb-2`}
        >
          Available Books
        </h2>
        <p className={isDark ? "text-gray-300" : "text-gray-600"}>
          Browse our collection of {books.length} books
        </p>
      </div>

      {/* Search and Filters */}
      <div
        className={`rounded-lg p-4 mb-6 ${
          isDark ? "bg-gray-700" : "bg-gray-100"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                isDark
                  ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border appearance-none ${
                isDark
                  ? "bg-gray-600 border-gray-500 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
            >
              <option value="all">All Books</option>
              <option value="Available">Available Only</option>
            </select>
          </div>

          {/* Sort Options */}
          <div className="relative">
            <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border appearance-none ${
                isDark
                  ? "bg-gray-600 border-gray-500 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
            >
              <option value="title">Sort by Title</option>
              <option value="author">Sort by Author</option>
              <option value="available">Sort by Availability</option>
            </select>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div>
        {filteredBooks.length > 0 ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto"
            style={{ maxHeight: "500px" }} // Adjust height as needed
          >
            {filteredBooks.map((book) => (
              <Link to={`/student/book/${book.id}`} key={book.id}>
                <StudentBookCard book={book} onBorrow={handleBorrowBook} />
              </Link>
            ))}
          </div>
        ) : (
          <div
            className={`text-center py-12 rounded-lg ${
              isDark ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <FaSearch
              className={`text-4xl mx-auto mb-4 ${
                isDark ? "text-gray-400" : "text-gray-300"
              }`}
            />
            <h3
              className={`text-lg font-semibold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              No books found
            </h3>
            <p className={isDark ? "text-gray-300" : "text-gray-600"}>
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookListEnhanced;
