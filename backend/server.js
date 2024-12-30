const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Enable CORS
app.use(cors());

// Parse incoming request bodies
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/myLibraryApp')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Sample book model (You may replace this with a MongoDB model)
let books = [];

// POST route to add a book
app.post('/books', (req, res) => {
  const { title, author, genre, publicationYear, rating, isBorrowed } = req.body;

  if (!title || !author || !genre || !publicationYear || rating == null || isBorrowed == null) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newBook = {
    title,
    author,
    genre,
    publicationYear,
    rating,
    isBorrowed,
  };

  books.push(newBook);
  return res.status(201).json(newBook);
});

// GET route to fetch all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Define a route for the root URL (optional)
app.get('/', (req, res) => {
  res.send('Welcome to the Book Library API!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
