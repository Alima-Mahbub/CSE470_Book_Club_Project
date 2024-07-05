const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('your_mongoDB_connection_string', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.log('Skipping MongoDB connection for now.');
  }
};

module.exports = connectDB;
