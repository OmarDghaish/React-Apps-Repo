import React from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddBookPage from './pages/AddBookPage';
import LoginPage from './pages/LoginPage';
import BookListPage from './pages/BooksListPage';
import './styles/App.css';

const App: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/" className="hover:text-gray-400">{i18n.t('addBook.Add')}</Link>
            </li>
            <li>
              <Link to="/books" className="hover:text-gray-400">{i18n.t('bookList.title')}</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-gray-400">{i18n.t('login.title')}</Link>
            </li>
          </ul>

          <div className="language-switcher">
            <button onClick={() => changeLanguage('en')} className="language-button">
              {i18n.t('english')}
            </button>
            <button onClick={() => changeLanguage('ar')} className="language-button">
              {i18n.t('arabic')}
            </button>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<AddBookPage />} />
          <Route path="/books" element={<BookListPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
