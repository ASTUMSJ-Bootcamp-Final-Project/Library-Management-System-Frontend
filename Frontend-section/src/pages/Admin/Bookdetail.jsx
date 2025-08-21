import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import books from "@/demo/Bookdata";
import AdminSidebar from "@/components/AdminSidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Example borrow history (replace with real data if available)
const borrowHistory = [
  { user: "Jane Doe", date: "2025-08-18", action: "Borrowed" },
  { user: "John Smith", date: "2025-08-17", action: "Returned" },
  { user: "Alice Lee", date: "2025-08-15", action: "Borrowed" },
];

const Bookdetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === Number(id));

  // Editable fields
  const [title, setTitle] = useState(book?.title || "");
  const [author, setAuthor] = useState(book?.author || "");
  const [description, setDescription] = useState(book?.description || "");
  const [totalAmount, setTotalAmount] = useState(book?.totalAmount || 0);
  const [borrowed, setBorrowed] = useState(book?.borrowed || 0);
  const [isbn, setIsbn] = useState(book?.isbn || "978-1-23456-789-0");
  const [year, setYear] = useState(book?.year || "2022");
  const [genre, setGenre] = useState(book?.genre || "Programming");
  const [status, setStatus] = useState(book?.status);

  if (!book) return <div className="p-6">Book not found.</div>;

  const handleDelete = () => {
    // Implement delete logic here (API or state update)
    alert("Book deleted!");
    navigate("/admin/books");
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Implement update logic here (API or state update)
    alert("Book updated successfully!");
    // Optionally, navigate or refresh
  };

  return (
    <div className="flex flex-row min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-3">
        <Navbar />
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Book Details</h1>
        <form
          className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg"
          onSubmit={handleUpdate}
        >
          <img
            src={book.image}
            alt={title}
            className="h-48 w-full object-cover rounded-xl mb-4"
          />
          <div className="mb-4">
            <label className="block text-blue-900 font-semibold mb-1">
              Title
            </label>
            <input
              className="border border-blue-300 rounded-md px-4 py-2 w-full mb-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label className="block text-blue-900 font-semibold mb-1">
              Author
            </label>
            <input
              className="border border-blue-300 rounded-md px-4 py-2 w-full mb-2"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <label className="block text-blue-900 font-semibold mb-1">
              Description
            </label>
            <textarea
              className="border border-blue-300 rounded-md px-4 py-2 w-full mb-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
            />
            <div className="flex gap-2 mb-2">
              <div className="flex-1">
                <label className="block text-blue-900 font-semibold mb-1">
                  Total Amount
                </label>
                <input
                  type="number"
                  min={0}
                  className="border border-blue-300 rounded-md px-4 py-2 w-full"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(Number(e.target.value))}
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-blue-900 font-semibold mb-1">
                  Borrowed
                </label>
                <input
                  type="number"
                  min={0}
                  className="border border-blue-300 rounded-md px-4 py-2 w-full"
                  value={borrowed}
                  onChange={(e) => setBorrowed(Number(e.target.value))}
                  required
                />
              </div>
            </div>
            <label className="block text-blue-900 font-semibold mb-1">
              ISBN
            </label>
            <input
              className="border border-blue-300 rounded-md px-4 py-2 w-full mb-2"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
            />
            <label className="block text-blue-900 font-semibold mb-1">
              Year
            </label>
            <input
              className="border border-blue-300 rounded-md px-4 py-2 w-full mb-2"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <label className="block text-blue-900 font-semibold mb-1">
              Genre
            </label>
            <input
              className="border border-blue-300 rounded-md px-4 py-2 w-full mb-2"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
            <label className="block text-blue-900 font-semibold mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-blue-300 rounded-md px-4 py-2 w-full mb-2"
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4 w-full font-bold"
          >
            Update Book
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition w-full font-bold"
          >
            Delete Book
          </button>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              Borrow History
            </h3>
            <ul className="divide-y divide-gray-200">
              {borrowHistory.map((entry, idx) => (
                <li key={idx} className="py-2 flex justify-between text-sm">
                  <span>{entry.user}</span>
                  <span>{entry.action}</span>
                  <span className="text-gray-500">{entry.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </form>
        <Footer />
      </main>
    </div>
  );
};

export default Bookdetail;
