const express = require('express');
const router = express.Router();
const { 
    bookAppointment, 
    getMyAppointments, 
    updateAppointmentStatus, 
    getAllAppointments 
} = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, authorize('Patient'), bookAppointment)
    .get(protect, authorize('Admin'), getAllAppointments);

router.route('/myappointments')
    .get(protect, getMyAppointments);

router.route('/:id/status')
    .put(protect, authorize('Doctor', 'Admin'), updateAppointmentStatus);

module.exports = router;
