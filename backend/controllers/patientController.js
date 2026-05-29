const Patient = require('../models/Patient');

// Helper to ensure patient profile exists
const getOrCreatePatientProfile = async (userId) => {
    let patient = await Patient.findOne({ user: userId });
    if (!patient) {
        patient = await Patient.create({ user: userId });
    }
    return patient;
};

// @desc    Get patient records
// @route   GET /api/patient/records
// @access  Private
const getPatientRecords = async (req, res) => {
    try {
        const patient = await getOrCreatePatientProfile(req.user._id);
        res.json({
            medicalHistory: patient.medicalHistory || [],
            labReports: patient.labReports || []
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add medical history
// @route   POST /api/patient/history
// @access  Private
const addMedicalHistory = async (req, res) => {
    try {
        const { condition, dateDiagnosed, status } = req.body;
        const patient = await getOrCreatePatientProfile(req.user._id);

        patient.medicalHistory.push({ condition, dateDiagnosed, status });
        await patient.save();

        res.status(201).json(patient.medicalHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add lab report
// @route   POST /api/patient/reports
// @access  Private
const addLabReport = async (req, res) => {
    try {
        const { testName, date, result } = req.body;
        const patient = await getOrCreatePatientProfile(req.user._id);

        patient.labReports.push({ testName, date, result });
        await patient.save();

        res.status(201).json(patient.labReports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// @desc    Get patient records by user ID
// @route   GET /api/patient/:userId/records
// @access  Private (Doctor, Admin)
const getPatientRecordsById = async (req, res) => {
    try {
        const patient = await getOrCreatePatientProfile(req.params.userId);
        res.json({
            medicalHistory: patient.medicalHistory || [],
            labReports: patient.labReports || []
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPatientRecords,
    addMedicalHistory,
    addLabReport,
    getPatientRecordsById
};
