const express = require('express');
const router = express.Router();
const { getPatientRecords, addMedicalHistory, addLabReport } = require('../controllers/patientController');
const { protect } = require('../middleware/authMiddleware');

router.route('/records').get(protect, getPatientRecords);
router.route('/history').post(protect, addMedicalHistory);
router.route('/reports').post(protect, addLabReport);

module.exports = router;
