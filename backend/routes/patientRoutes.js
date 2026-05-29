const express = require('express');
const router = express.Router();
const { getPatientRecords, addMedicalHistory, addLabReport, getPatientRecordsById } = require('../controllers/patientController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/records').get(protect, getPatientRecords);
router.route('/history').post(protect, addMedicalHistory);
router.route('/reports').post(protect, addLabReport);
router.route('/:userId/records').get(protect, authorize('Doctor', 'Admin'), getPatientRecordsById);

module.exports = router;
