const mongoose = require('mongoose');

const bedSchema = new mongoose.Schema({
    bedNumber: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum: ['ICU', 'General Ward', 'Private Room']
    },
    status: {
        type: String,
        required: true,
        enum: ['Available', 'Occupied', 'Maintenance'],
        default: 'Available'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    admissionDate: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

const Bed = mongoose.model('Bed', bedSchema);
module.exports = Bed;
