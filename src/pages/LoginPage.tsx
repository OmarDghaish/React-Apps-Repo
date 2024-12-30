import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import '../styles/LoginPage.css';

const LoginPage: React.FC = () => {
  const { t } = useTranslation(); // Translation hook
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });
      console.log(response.data.message);
      if (response.data.success) {
        // Handle successful login (e.g., redirect to a different page)
      }
    } catch (error: any) {
      setError(t('login.error') || 'Invalid username or password'); // Localize error message
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container p-4">
      <h1>{t('login.title')}</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="username" className="block font-semibold">{t('login.username')}</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('login.username_placeholder')}
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-semibold">{t('login.password')}</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('login.password_placeholder')}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded w-full disabled:bg-blue-300"
        >
          {loading ? t('login.loading') : t('login.button')}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
