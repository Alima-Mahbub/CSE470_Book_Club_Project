const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  profilePhoto: {
    type: String,
  },
  booksRead: {
    type: Number,
    default: 0,
  },
  reviewsWritten: {
    type: Number,
    default: 0,
  },
  followers: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('User', UserSchema);
