import React, { useState, useEffect } from 'react';
import API from '../services/api';

const initialBookState = {
  title: '',
  author: '',
  category: '',
  price: '',
  rating: '',
  publishedDate: '',
};

const BookForm = ({ fetchBooks, selectedBook, setSelectedBook, onBookSaved }) => {
  const [book, setBook] = useState(initialBookState);

  useEffect(() => {
    if (selectedBook) {
      setBook(selectedBook);
    }
  }, [selectedBook]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedBook) {
        await API.put(`/books/${selectedBook._id}`, book);
      } else {
        await API.post('/books', book);
      }
      fetchBooks?.(); // optional chaining in case not passed
      onBookSaved?.(); // Notify parent to refresh
      setBook(initialBookState);
      setSelectedBook(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Book operation failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-lg mb-6">
      <h3 className="text-xl font-semibold mb-4">{selectedBook ? 'Edit Book' : 'Add New Book'}</h3>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="p-2 border rounded"
          value={book.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          className="p-2 border rounded"
          value={book.author}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          className="p-2 border rounded"
          value={book.category}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="p-2 border rounded"
          value={book.price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          className="p-2 border rounded"
          value={book.rating}
          onChange={handleChange}
          min="0"
          max="5"
        />
        <input
          type="date"
          name="publishedDate"
          className="p-2 border rounded"
          value={book.publishedDate}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {selectedBook ? 'Update' : 'Add'}
      </button>
    </form>
  );
};

export default BookForm;
