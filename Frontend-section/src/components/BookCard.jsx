import React from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-pointer flex flex-col"
      onClick={() => navigate(`/admin/book/${book.id}`)}
    >
      <img
        src={book.image}
        alt={book.title}
        className="h-64 w-40 object-cover mx-auto mt-4 rounded-lg"
      />
      <div className="p-4 flex-1 flex flex-col">
        <h2 className="text-lg font-bold text-blue-700">{book.title}</h2>
        <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
        <p className="text-gray-700 mb-3 flex-1">{book.description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            Total: {book.totalAmount}
          </span>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
            Borrowed: {book.borrowed}
          </span>
          <span
            className={`text-xs px-2 py-1 rounded ${
              book.status === "Available"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {book.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
