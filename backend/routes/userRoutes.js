const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, getAllUsers, createUser, deleteUser } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, authorize('Admin'), getAllUsers)
    .post(protect, authorize('Admin'), createUser);

router.route('/:id')
    .delete(protect, authorize('Admin'), deleteUser);

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

module.exports = router;
