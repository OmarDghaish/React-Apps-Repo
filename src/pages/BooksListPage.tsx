import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/BooksListPage.css'

const BookListPage: React.FC = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/books');
        setBooks(response.data);
      } catch (error) {
        alert('Error occurred while fetching books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h1>All Books</h1>
      {loading ? (
        <p>Loading books...</p>
      ) : (
        <ul>
          {books.map((book: any) => (
            <li key={book._id}>
              {book.title} by {book.author} ({book.publicationYear})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookListPage;
