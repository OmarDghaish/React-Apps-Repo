import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/UpdateBookPage.css';

interface Book {
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
  rating: number;
  isBorrowed: boolean;
}

const UpdateBookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [book, setBook] = useState<Book>({
    title: '',
    author: '',
    genre: '',
    publicationYear: 0,
    rating: 0,
    isBorrowed: false,
  });

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    console.log('Book ID:', id); // Check if the ID is correctly retrieved
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };
    fetchBook();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: name === 'isBorrowed' ? value === 'true' : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/books/${id}`, book);
      navigate('/books');
    } catch (error) {
      console.error('Error updating book:', error);
      setErrorMessage('Failed to update book. Please try again.');
    }
  };

  return (
    <div className="update-book-page">
      <div className="update-book-container">
        <h1>Update Book</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Author:
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Genre:
            <input
              type="text"
              name="genre"
              value={book.genre}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Publication Year:
            <input
              type="number"
              name="publicationYear"
              value={book.publicationYear}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Rating:
            <input
              type="number"
              name="rating"
              value={book.rating}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Is Borrowed:
            <select
              name="isBorrowed"
              value={book.isBorrowed ? 'true' : 'false'}
              onChange={handleInputChange}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>
          <button type="submit">Update Book</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBookPage;
