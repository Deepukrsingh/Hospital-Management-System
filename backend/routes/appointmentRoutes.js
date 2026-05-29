const express = require('express');
const router = express.Router();
const { 
    bookAppointment, 
    getMyAppointments, 
    updateAppointmentStatus, 
    getAllAppointments,
    addPrescription,
    getBookedSlots
} = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, authorize('Patient'), bookAppointment)
    .get(protect, authorize('Admin'), getAllAppointments);

router.route('/myappointments')
    .get(protect, getMyAppointments);

router.route('/booked-slots')
    .get(protect, getBookedSlots);

router.route('/:id/status')
    .put(protect, authorize('Doctor', 'Admin'), updateAppointmentStatus);

router.route('/:id/prescription')
    .put(protect, authorize('Doctor'), addPrescription);

module.exports = router;
