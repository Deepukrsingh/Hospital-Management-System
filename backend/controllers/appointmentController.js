const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

// @desc    Book a new appointment
// @route   POST /api/appointments
// @access  Private (Patient)
const bookAppointment = async (req, res) => {
    try {
        const { doctorId, doctorInfo, userInfo, date, time } = req.body;

        const appointment = await Appointment.create({
            userId: req.user._id,
            doctorId,
            doctorInfo,
            userInfo,
            date,
            time,
            status: 'pending'
        });

        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user's appointments
// @route   GET /api/appointments/myappointments
// @access  Private
const getMyAppointments = async (req, res) => {
    try {
        // If doctor, fetch appointments where they are the doctor
        if (req.user.role === 'Doctor') {
            const doctor = await Doctor.findOne({ user: req.user._id });
            if (!doctor) return res.status(404).json({ message: 'Doctor profile not found' });
            
            const appointments = await Appointment.find({ doctorId: doctor._id })
                .populate('userId', 'name email');
            return res.json(appointments);
        }

        // If patient, fetch their own appointments
        const appointments = await Appointment.find({ userId: req.user._id })
            .populate('doctorId', 'name specialization');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id/status
// @access  Private (Doctor/Admin)
const updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Verify authorization
        if (req.user.role === 'Doctor') {
            const doctor = await Doctor.findOne({ user: req.user._id });
            if (!doctor || doctor._id.toString() !== appointment.doctorId.toString()) {
                return res.status(403).json({ message: 'Not authorized to update this appointment' });
            }
        } else if (req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        appointment.status = status;
        const updatedAppointment = await appointment.save();

        res.json(updatedAppointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all appointments (Admin)
// @route   GET /api/appointments
// @access  Private/Admin
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('userId', 'name email')
            .populate('doctorId', 'name specialization');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    bookAppointment,
    getMyAppointments,
    updateAppointmentStatus,
    getAllAppointments
};
