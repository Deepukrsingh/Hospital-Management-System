const express = require('express');
const router = express.Router();
const { checkSymptoms } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.route('/symptom-checker')
    .post(protect, checkSymptoms);

module.exports = router;
