const Doctor = require('../models/Doctor');
const User = require('../models/User');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find().populate('user', 'name email');
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).populate('user', 'name email');
        if (doctor) {
            res.json(doctor);
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create doctor profile
// @route   POST /api/doctors
// @access  Private/Admin
const createDoctor = async (req, res) => {
    try {
        const { 
            userId, 
            specialization, 
            experience, 
            feesPerCunsultation, 
            timings, 
            status,
            qualifications,
            designation,
            department,
            about,
            education,
            experienceList
        } = req.body;
        
        // Ensure user exists and is a doctor
        const user = await User.findById(userId);
        if (!user || user.role !== 'Doctor') {
            return res.status(400).json({ message: 'Valid user with Doctor role required' });
        }

        const doctorExists = await Doctor.findOne({ user: userId });
        if (doctorExists) {
            return res.status(400).json({ message: 'Doctor profile already exists for this user' });
        }

        const doctor = await Doctor.create({
            user: userId,
            specialization: specialization || 'General Practice',
            experience: Number(experience) || 0,
            feesPerCunsultation: Number(feesPerCunsultation) || 0,
            timings: Array.isArray(timings) && timings.length > 0 ? timings : ['09:00 AM', '11:00 AM', '02:00 PM'],
            status: status || 'pending',
            qualifications: qualifications || '',
            designation: designation || '',
            department: department || '',
            about: about || '',
            education: Array.isArray(education) ? education : education ? [education] : [],
            experienceList: Array.isArray(experienceList) ? experienceList : experienceList ? [experienceList] : []
        });

        res.status(201).json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getDoctors,
    getDoctorById,
    createDoctor
};
