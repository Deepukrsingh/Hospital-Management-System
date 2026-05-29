const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    doctorInfo: {
        type: Object,
        required: true
    },
    userInfo: {
        type: Object,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    appointmentType: {
        type: String,
        required: true,
        default: 'OPD',
        enum: ['OPD', 'Online']
    },
    fees: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        required: true,
        default: 'pending', // pending, approved, rejected, completed
        enum: ['pending', 'approved', 'rejected', 'completed']
    },
    prescription: {
        medicines: [{
            name: String,
            dosage: String,
            duration: String,
            instructions: String
        }],
        notes: String,
        issuedAt: { type: Date, default: Date.now }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);
