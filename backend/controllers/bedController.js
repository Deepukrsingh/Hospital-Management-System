const Bed = require('../models/Bed');
const User = require('../models/User');

// @desc    Get all beds
// @route   GET /api/beds
// @access  Private (Admin)
const getBeds = async (req, res) => {
    try {
        const beds = await Bed.find({}).populate('assignedTo', 'name email');
        res.json(beds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a new bed
// @route   POST /api/beds
// @access  Private (Admin)
const addBed = async (req, res) => {
    try {
        const { bedNumber, type } = req.body;
        
        const bedExists = await Bed.findOne({ bedNumber });
        if (bedExists) {
            return res.status(400).json({ message: 'Bed number already exists' });
        }

        const bed = await Bed.create({
            bedNumber,
            type,
            status: 'Available'
        });

        res.status(201).json(bed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update bed status
// @route   PUT /api/beds/:id/status
// @access  Private (Admin)
const updateBedStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const bed = await Bed.findById(req.params.id);

        if (!bed) {
            return res.status(404).json({ message: 'Bed not found' });
        }

        if (status === 'Available' || status === 'Maintenance') {
            if (bed.status === 'Occupied' && status !== 'Occupied') {
                bed.assignedTo = null;
                bed.admissionDate = null;
            }
            bed.status = status;
        }

        const updatedBed = await bed.save();
        const populatedBed = await Bed.findById(updatedBed._id).populate('assignedTo', 'name email');
        res.json(populatedBed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Allocate bed to patient
// @route   PUT /api/beds/:id/allocate
// @access  Private (Admin)
const allocateBed = async (req, res) => {
    try {
        const { patientId } = req.body;
        const bed = await Bed.findById(req.params.id);

        if (!bed) {
            return res.status(404).json({ message: 'Bed not found' });
        }

        if (bed.status !== 'Available') {
            return res.status(400).json({ message: 'Bed is not available' });
        }

        const patient = await User.findById(patientId);
        if (!patient || patient.role !== 'Patient') {
            return res.status(404).json({ message: 'Patient not found' });
        }

        bed.status = 'Occupied';
        bed.assignedTo = patient._id;
        bed.admissionDate = Date.now();

        const updatedBed = await bed.save();
        const populatedBed = await Bed.findById(updatedBed._id).populate('assignedTo', 'name email');
        res.json(populatedBed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Discharge patient from bed
// @route   PUT /api/beds/:id/discharge
// @access  Private (Admin)
const dischargeBed = async (req, res) => {
    try {
        const bed = await Bed.findById(req.params.id);

        if (!bed) {
            return res.status(404).json({ message: 'Bed not found' });
        }

        bed.status = 'Available';
        bed.assignedTo = null;
        bed.admissionDate = null;

        const updatedBed = await bed.save();
        res.json(updatedBed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getBeds,
    addBed,
    updateBedStatus,
    allocateBed,
    dischargeBed
};
