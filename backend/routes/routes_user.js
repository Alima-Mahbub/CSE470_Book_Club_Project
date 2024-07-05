const express = require('express');
const router = express.Router();
const {
  uploadProfilePhoto,
  editUserProfile,
  changePassword,
  getUserProfile,
  getUserStatistics,
} = require('../controllers/user_controller');
const auth = require('../middleware/auth_midware');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

router.post('/uploadProfilePhoto', auth, upload.single('profilePhoto'), uploadProfilePhoto);
router.put('/editUserProfile', auth, editUserProfile);
router.put('/changePassword', auth, changePassword);
router.get('/getUserProfile', auth, getUserProfile);
router.get('/getUserStatistics', auth, getUserStatistics);

module.exports = router;
