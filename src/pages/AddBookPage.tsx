import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import '../styles/AddBookPage.css';

const AddBookPage: React.FC = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publicationYear: '',
    rating: 0,
    isBorrowed: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { title, author, genre, publicationYear, rating, isBorrowed } = formData;

  // Handle form field change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!title || !author || !genre || !publicationYear || rating < 0 || rating > 5) {
      setError(t('addBook.validationError'));
      return;
    }

    setLoading(true);
    setError(null); // Reset error before submitting

    const newBook = {
      title,
      author,
      genre,
      publicationYear: Number(publicationYear),
      rating,
      isBorrowed,
    };

    try {
      await axios.post('http://localhost:5000/books', newBook);
      alert(t('Book Is Added Successfully'));
      setFormData({
        title: '',
        author: '',
        genre: '',
        publicationYear: '',
        rating: 0,
        isBorrowed: false,
      });
    } catch (error) {
      alert(t('Book Is Not Added!!!'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-book-container">
      <h1>{t('addBook.New Book!')}</h1> {/* Title Translation */}
      <form onSubmit={handleAddBook} className="add-book-form">
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="title">{t('addBook.title')}</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleChange}
            placeholder={t('addBook.title')}
            required
            aria-required="true"
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">{t('addBook.author')}</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={handleChange}
            placeholder={t('addBook.author name')}
            required
            aria-required="true"
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre">{t('addBook.genre')}</label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={handleChange}
            placeholder={t('addBook.genre')}
            required
            aria-required="true"
          />
        </div>

        <div className="form-group">
          <label htmlFor="publicationYear">{t('addBook.publicationYear')}</label>
          <input
            type="number"
            id="publicationYear"
            value={publicationYear}
            onChange={handleChange}
            placeholder={t('addBook.2025, 1, 1')}
            required
            min="1000"
            max="9999"
            aria-required="true"
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">{t('addBook.rating')}</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={handleChange}
            placeholder={t('addBook.0')}
            required
            min="0"
            max="5"
            aria-required="true"
          />
        </div>

        <div className="form-group">
          <label htmlFor="isBorrowed">{t('addBook.isBorrowed')}</label>
          <input
            type="checkbox"
            id="isBorrowed"
            checked={isBorrowed}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? t('addBook.adding') : t('addBook.ADD BOOK')}
        </button>
      </form>
    </div>
  );
};

export default AddBookPage;
