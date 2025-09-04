import AdminSidebar from "@/components/AdminSidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
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

const AddBook = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    isbn: "",
    publishedYear: "",
    publisher: "",
    totalCopies: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.author.trim()) newErrors.author = "Author is required";
    if (!formData.genre.trim()) newErrors.genre = "Genre is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.isbn.trim()) newErrors.isbn = "ISBN is required";
    if (!formData.publishedYear)
      newErrors.publishedYear = "Published year is required";
    if (!formData.totalCopies || formData.totalCopies < 1)
      newErrors.totalCopies = "Must have at least 1 copy";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      console.log("Submitting book data:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form on success
      setFormData({
        title: "",
        author: "",
        genre: "",
        description: "",
        isbn: "",
        publishedYear: "",
        publisher: "",
        totalCopies: "",
      });

      alert("Book added successfully!");
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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

        <div className="max-w-4xl mx-auto">
          <h1
            className={`text-3xl md:text-3xl font-bold ${
        isDark ? "text-white" : "text-blue-600"
        } mb-2 px-80 py-5`}
             
         style={{ fontFamily: "Bebas_Neue" }}
       
          >
            ADD NEW BOOK
          </h1>

          <Card className={isDark ? "bg-gray-800 border-gray-700" : ""}>
            <CardHeader>
              <CardTitle className={isDark ? "text-white" : ""}>
                Book Information
              </CardTitle>
              <CardDescription className={isDark ? "text-gray-400" : ""}>
                Fill in the details to add a new book to the library
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter book title"
                      className={
                        isDark ? "bg-gray-700 border-gray-600 text-white" : ""
                      }
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm">{errors.title}</p>
                    )}
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
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      placeholder="Enter author name"
                      className={
                        isDark ? "bg-gray-700 border-gray-600 text-white" : ""
                      }
                    />
                    {errors.author && (
                      <p className="text-red-500 text-sm">{errors.author}</p>
                    )}
                  </div>

                  {/* Genre */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="genre"
                      className={isDark ? "text-white" : ""}
                    >
                      Genre *
                    </Label>
                    <Input
                      id="genre"
                      name="genre"
                      value={formData.genre}
                      onChange={handleInputChange}
                      placeholder="e.g., Fiction, Science, History"
                      className={
                        isDark ? "bg-gray-700 border-gray-600 text-white" : ""
                      }
                    />
                    {errors.genre && (
                      <p className="text-red-500 text-sm">{errors.genre}</p>
                    )}
                  </div>

                  {/* ISBN */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="isbn"
                      className={isDark ? "text-white" : ""}
                    >
                      ISBN *
                    </Label>
                    <Input
                      id="isbn"
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleInputChange}
                      placeholder="Enter ISBN number"
                      className={
                        isDark ? "bg-gray-700 border-gray-600 text-white" : ""
                      }
                    />
                    {errors.isbn && (
                      <p className="text-red-500 text-sm">{errors.isbn}</p>
                    )}
                  </div>

                  {/* Published Year */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="publishedYear"
                      className={isDark ? "text-white" : ""}
                    >
                      Published Year *
                    </Label>
                    <Input
                      id="publishedYear"
                      name="publishedYear"
                      type="number"
                      value={formData.publishedYear}
                      onChange={handleInputChange}
                      placeholder="e.g., 2023"
                      min="1000"
                      max="2030"
                      className={
                        isDark ? "bg-gray-700 border-gray-600 text-white" : ""
                      }
                    />
                    {errors.publishedYear && (
                      <p className="text-red-500 text-sm">
                        {errors.publishedYear}
                      </p>
                    )}
                  </div>

                  {/* Total Copies */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="totalCopies"
                      className={isDark ? "text-white" : ""}
                    >
                      Total Copies *
                    </Label>
                    <Input
                      id="totalCopies"
                      name="totalCopies"
                      type="number"
                      value={formData.totalCopies}
                      onChange={handleInputChange}
                      placeholder="Number of copies"
                      min="1"
                      className={
                        isDark ? "bg-gray-700 border-gray-600 text-white" : ""
                      }
                    />
                    {errors.totalCopies && (
                      <p className="text-red-500 text-sm">
                        {errors.totalCopies}
                      </p>
                    )}
                  </div>

                  {/* Publisher */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="publisher"
                      className={isDark ? "text-white" : ""}
                    >
                      Publisher
                    </Label>
                    <Input
                      id="publisher"
                      name="publisher"
                      value={formData.publisher}
                      onChange={handleInputChange}
                      placeholder="Enter publisher name"
                      className={
                        isDark ? "bg-gray-700 border-gray-600 text-white" : ""
                      }
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
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter book description"
                    rows="4"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description}</p>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isSubmitting ? "Adding Book..." : "Add Book"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setFormData({
                        title: "",
                        author: "",
                        genre: "",
                        description: "",
                        isbn: "",
                        publishedYear: "",
                        publisher: "",
                        totalCopies: "",
                      })
                    }
                    className={
                      isDark
                        ? "border-gray-600 text-white hover:bg-gray-700"
                        : ""
                    }
                  >
                    Clear Form
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default AddBook;
