const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/myLibraryApp')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit if the connection fails
  });


// Book schema
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publicationYear: { type: Number, required: true },
  rating: { type: Number, required: true },
  isBorrowed: { type: Boolean, required: true },
});

const Book = mongoose.model('Book', bookSchema);


// Base Route
app.get('/', (req, res) => {
  res.send('Welcome to the Book Library API!');
});

// Routes
// app.get('/books', async (req, res) => { try {
//       const books = await Book.find();
//       res.json(books);
//     } catch (error) {
//       console.error('Error fetching books:', error);
//       res.status(500).json({ message: 'Failed to fetch books' });
//     }}); 

// Routes
// Get all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Failed to fetch books' });
  }
});

// Get a single book by ID
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ message: 'Failed to fetch book' });
  }
});

// Update a book by ID
app.put('/books/:id', async (req, res) => {
  const { title, author, genre, publicationYear, rating, isBorrowed } = req.body;

  if (!title || !author || !genre || publicationYear == null || rating == null || isBorrowed == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, genre, publicationYear, rating, isBorrowed },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Failed to update book' });
  }
});

// Create a new book
app.post('/books', async (req, res) => {
  const { title, author, genre, publicationYear, rating, isBorrowed } = req.body;

  if (!title || !author || !genre || publicationYear == null || rating == null || isBorrowed == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newBook = new Book({
    title,
    author,
    genre,
    publicationYear,
    rating,
    isBorrowed,
  });

  try {
    await newBook.save();
    res.status(201).json(newBook); // Return the created book
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ message: 'Failed to create book' });
  }
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
