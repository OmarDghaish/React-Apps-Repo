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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get<Book>(`http://localhost:5000/books/${id}`);
        setBook(response.data);
      } catch (error: any) {
        console.error('Error fetching book:', error);
        setErrorMessage('Failed to fetch book details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      // Cast the target as HTMLInputElement to get the 'checked' property
      const checked = (e.target as HTMLInputElement).checked;
      setBook((prevBook) => ({
        ...prevBook,
        [name]: checked,  // Use the checked value for checkboxes
      }));
    } else {
      setBook((prevBook) => ({
        ...prevBook,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/books/${id}`, book);
      navigate('/books');
    } catch (error: any) {
      console.error('Error updating book:', error);
      const message = error.response?.data?.message || 'Failed to update book. Please try again.';
      setErrorMessage(message);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
              min="1500"
              max={new Date().getFullYear()}
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
              min="0"
              max="5"
              step="0.1"
              required
            />
          </label>
          <label>
            Is Borrowed:
            <input
              type="checkbox"
              name="isBorrowed"
              checked={book.isBorrowed}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Update Book</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBookPage;
