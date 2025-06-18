const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedPosts: [{ title: String, date: String, summary: String }],
  notes:      [{ date: String, content: String }],
  theme: { type: String, enum: ['light', 'dark'], default: 'light' }
});

module.exports = mongoose.model('User', userSchema);
