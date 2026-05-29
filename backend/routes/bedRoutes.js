const express = require('express');
const router = express.Router();
const { getBeds, addBed, updateBedStatus, allocateBed, dischargeBed } = require('../controllers/bedController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, authorize('Admin', 'Receptionist', 'Doctor'), getBeds)
    .post(protect, authorize('Admin'), addBed);

router.route('/:id/status')
    .put(protect, authorize('Admin'), updateBedStatus);

router.route('/:id/allocate')
    .put(protect, authorize('Admin', 'Receptionist'), allocateBed);

router.route('/:id/discharge')
    .put(protect, authorize('Admin', 'Receptionist', 'Doctor'), dischargeBed);

module.exports = router;
