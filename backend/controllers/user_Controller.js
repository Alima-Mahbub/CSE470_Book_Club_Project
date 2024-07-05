const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.uploadProfilePhoto = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.profilePhoto = req.file.path;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.editUserProfile = async (req, res) => {
  const { name, bio } = req.body;
  try {
    const user = await User.findById(req.user.id);
    user.name = name || user.name;
    user.bio = bio || user.bio;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ msg: 'Password changed successfully' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getUserStatistics = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const stats = {
      booksRead: user.booksRead,
      reviewsWritten: user.reviewsWritten,
      followers: user.followers,
    };
    res.json(stats);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
