const express = require('express');
const router = express.Router();
const { getDoctors, getDoctorById, createDoctor } = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(getDoctors)
    .post(protect, authorize('Admin'), createDoctor);

router.route('/:id')
    .get(getDoctorById);

module.exports = router;
