import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddBookPage.css';

const AddBookPage: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publicationYear: '',
    rating: 0,
    isBorrowed: false,
  });
  const [loading, setLoading] = useState(false);

  const { title, author, genre, publicationYear, rating, isBorrowed } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const newBook = {
      title,
      author,
      genre,
      publicationYear: Number(publicationYear),
      rating,
      isBorrowed,
    };

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/books', newBook);
      alert('Book added successfully!');
      setFormData({
        title: '',
        author: '',
        genre: '',
        publicationYear: '',
        rating: 0,
        isBorrowed: false,
      });
    } catch (error) {
      alert('Error occurred while adding book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-book-container">
      <h1>Add a Book</h1>
      <form onSubmit={handleAddBook}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="publicationYear">Publication Year</label>
          <input
            type="number"
            id="publicationYear"
            value={publicationYear}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={handleChange}
            required
            min="0"
            max="5"
          />
        </div>
        <div>
          <label htmlFor="isBorrowed">Is Borrowed</label>
          <input
            type="checkbox"
            id="isBorrowed"
            checked={isBorrowed}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default AddBookPage;
