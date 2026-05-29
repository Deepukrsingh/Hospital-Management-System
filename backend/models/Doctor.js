const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    specialization: {
        type: String,
        required: [true, 'Please add a specialization']
    },
    experience: {
        type: Number,
        required: [true, 'Please add experience in years']
    },
    feesPerCunsultation: {
        type: Number,
        required: [true, 'Please add consultation fees']
    },
    timings: {
        type: Array, // Array of strings or objects representing available slots
        required: true
    },
    qualifications: {
        type: [String],
        default: []
    },
    designation: {
        type: String,
        default: ''
    },
    department: {
        type: String,
        default: ''
    },
    about: {
        type: String,
        default: ''
    },
    education: {
        type: [String],
        default: []
    },
    experienceList: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'approved', 'rejected']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema);
