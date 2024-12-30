// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }, // In a real application, you should hash the password
});

module.exports = mongoose.model('User', userSchema);
