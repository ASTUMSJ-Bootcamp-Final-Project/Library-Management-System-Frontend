import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import books from "@/demo/Bookdata";
import AdminSidebar from "@/components/AdminSidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Example borrow history (replace with real data if available)
const borrowHistory = [
  { user: "Jane Doe", date: "2025-08-18", action: "Borrowed" },
  { user: "John Smith", date: "2025-08-17", action: "Returned" },
  { user: "Alice Lee", date: "2025-08-15", action: "Borrowed" },
];

const Bookdetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
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
    <div
      className={`flex flex-row min-h-screen ${
        isDark ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <AdminSidebar />
      <main className="flex-1 px-6 py-3">
        <Navbar />

        <div className="max-w-6xl mx-auto">
          <h1
            className={`text-3xl md:text-3xl font-bold ${
        isDark ? "text-white" : "text-blue-600"
        } mb-2 px-85 py-5`}
          style={{ fontFamily: "Bebas_Neue" }}
          >
            BOOK DETAILS
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Book Image Section */}
            <Card className={isDark ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader>
                <CardTitle className={isDark ? "text-white" : ""}>
                  Book Cover
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <img
                  src={book.image}
                  alt={title}
                  className="w-full max-w-md h-80 object-contain rounded-lg shadow-xl mb-4 transform hover:scale-105 transition-transform duration-300"
                />
                <div
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  } text-center`}
                >
                  Book ID: {book.id}
                </div>
              </CardContent>
            </Card>

            {/* Book Information Form */}
            <Card className={isDark ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader>
                <CardTitle className={isDark ? "text-white" : ""}>
                  Book Information
                </CardTitle>
                <CardDescription className={isDark ? "text-gray-400" : ""}>
                  Edit the book details below
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Title */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="title"
                        className={isDark ? "text-white" : ""}
                      >
                        Title *
                      </Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Book title"
                        className={
                          isDark ? "bg-gray-700 border-gray-600 text-white" : ""
                        }
                        required
                      />
                    </div>

                    {/* Author */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="author"
                        className={isDark ? "text-white" : ""}
                      >
                        Author *
                      </Label>
                      <Input
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Author name"
                        className={
                          isDark ? "bg-gray-700 border-gray-600 text-white" : ""
                        }
                        required
                      />
                    </div>

                    {/* ISBN */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="isbn"
                        className={isDark ? "text-white" : ""}
                      >
                        ISBN
                      </Label>
                      <Input
                        id="isbn"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        placeholder="ISBN number"
                        className={
                          isDark ? "bg-gray-700 border-gray-600 text-white" : ""
                        }
                      />
                    </div>

                    {/* Published Year */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="year"
                        className={isDark ? "text-white" : ""}
                      >
                        Published Year
                      </Label>
                      <Input
                        id="year"
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="2023"
                        min="1000"
                        max="2030"
                        className={
                          isDark ? "bg-gray-700 border-gray-600 text-white" : ""
                        }
                      />
                    </div>

                    {/* Genre */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="genre"
                        className={isDark ? "极text-white" : ""}
                      >
                        Genre
                      </Label>
                      <Input
                        id="genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        placeholder="Fiction, Science, etc."
                        className={
                          isDark ? "bg-gray-700 border-gray-600 text-white" : ""
                        }
                      />
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="status"
                        className={isDark ? "text-white" : ""}
                      >
                        Status
                      </Label>
                      <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDark
                            ? "bg-gray-700 border-gray-600 text-white"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="Available">Available</option>
                        <option value="Unavailable">Unavailable</option>
                      </select>
                    </div>

                    {/* Total Amount */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="totalAmount"
                        className={isDark ? "text-white" : ""}
                      >
                        Total Copies *
                      </Label>
                      <Input
                        id="totalAmount"
                        type="number"
                        min="0"
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(Number(e.target.value))}
                        placeholder="Total copies"
                        className={
                          isDark ? "bg-gray-700 border-gray-600 text-white" : ""
                        }
                        required
                      />
                    </div>

                    {/* Borrowed */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="borrowed"
                        className={isDark ? "text-white" : ""}
                      >
                        Borrowed Copies
                      </Label>
                      <Input
                        id="borrowed"
                        type="number"
                        min="0"
                        value={borrowed}
                        onChange={(e) => setBorrowed(Number(e.target.value))}
                        placeholder="Borrowed copies"
                        className={
                          isDark ? "bg-gray-700 border-gray-600 text-white" : ""
                        }
                        required
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="description"
                      className={isDark ? "text-white" : ""}
                    >
                      Description *
                    </Label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Book description"
                      rows="4"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDark
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "border-gray-300"
                      }`}
                      required
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Update Book
                    </Button>

                    <Button
                      type="button"
                      variant="destructive"
                      onClick={handleDelete}
                    >
                      Delete Book
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Borrow History Section */}
          <Card
            className={`mt-8 ${isDark ? "bg-gray-800 border-gray-700" : ""}`}
          >
            <CardHeader>
              <CardTitle className={isDark ? "text-white" : ""}>
                Borrow History
              </CardTitle>
              <CardDescription className={isDark ? "text-gray-400" : ""}>
                Recent borrowing activity for this book
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr
                      className={
                        isDark
                          ? "border-b border-gray-700"
                          : "border-b border-gray-200"
                      }
                    >
                      <th
                        className={`text-left py-2 ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        User
                      </th>
                      <th
                        className={`text-left py-2 ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Action
                      </th>
                      <th
                        className={`text-left py-2 ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {borrowHistory.map((entry, idx) => (
                      <tr
                        key={idx}
                        className={
                          isDark
                            ? "border-b border-gray-700"
                            : "border-b border-gray-200"
                        }
                      >
                        <td
                          className={`py-3 ${
                            isDark ? "text-gray-300" : "text-gray-800"
                          }`}
                        >
                          {entry.user}
                        </td>
                        <td
                          className={`py-3 ${
                            isDark ? "text-gray-300" : "text-gray-800"
                          }`}
                        >
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              entry.action === "Borrowed"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {entry.action}
                          </span>
                        </td>
                        <td
                          className={`py-3 ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {entry.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {borrowHistory.length === 0 && (
                <div
                  className={`text-center py-8 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  No borrow history available
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Bookdetail;
