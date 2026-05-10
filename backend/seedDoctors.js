const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Doctor = require('./models/Doctor');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedDoctors = async () => {
  try {
    await connectDB();

    // Check if doctors already exist to prevent duplicates
    const existingDoctors = await User.find({ role: 'Doctor' });
    if (existingDoctors.length > 0) {
      console.log('Doctors already exist. Clearing old doctors...');
      await User.deleteMany({ role: 'Doctor' });
      try { await Doctor.collection.drop(); } catch(e) {} // Ignore error if doesn't exist
    }

    // Create Doctor Users
    const doctorUsers = [
      // Cardiology
      { name: 'Dr. Rajesh Sharma', email: 'rajesh@medicure.com', password: 'password123', role: 'Doctor' },
      { name: 'Dr. Anjali Desai', email: 'anjali@medicure.com', password: 'password123', role: 'Doctor' },
      // Neurology
      { name: 'Dr. Vikram Singh', email: 'vikram@medicure.com', password: 'password123', role: 'Doctor' },
      { name: 'Dr. Priya Patel', email: 'priya@medicure.com', password: 'password123', role: 'Doctor' },
      // Pediatrics
      { name: 'Dr. Sanjay Gupta', email: 'sanjay@medicure.com', password: 'password123', role: 'Doctor' },
      { name: 'Dr. Kavita Reddy', email: 'kavita@medicure.com', password: 'password123', role: 'Doctor' },
      // Orthopedics
      { name: 'Dr. Amit Kumar', email: 'amit@medicure.com', password: 'password123', role: 'Doctor' },
      { name: 'Dr. Neha Joshi', email: 'neha@medicure.com', password: 'password123', role: 'Doctor' },
      // Dentistry
      { name: 'Dr. Rohan Mehta', email: 'rohan@medicure.com', password: 'password123', role: 'Doctor' },
      { name: 'Dr. Sneha Iyer', email: 'sneha@medicure.com', password: 'password123', role: 'Doctor' },
      // Ophthalmology
      { name: 'Dr. Arun Verma', email: 'arun@medicure.com', password: 'password123', role: 'Doctor' },
      { name: 'Dr. Pooja Nair', email: 'pooja@medicure.com', password: 'password123', role: 'Doctor' }
    ];

    const createdUsers = await User.create(doctorUsers);

    // Create Doctor Profiles
    const doctorProfiles = [
      // Cardiology
      { user: createdUsers[0]._id, specialization: 'Cardiology', experience: 18, qualifications: ['MD', 'DM'], feesPerCunsultation: 1500, timings: ['10:00 AM - 01:00 PM', '04:00 PM - 08:00 PM'] },
      { user: createdUsers[1]._id, specialization: 'Cardiology', experience: 12, qualifications: ['MD', 'FACC'], feesPerCunsultation: 1200, timings: ['09:00 AM - 12:00 PM', '03:00 PM - 06:00 PM'] },
      // Neurology
      { user: createdUsers[2]._id, specialization: 'Neurology', experience: 20, qualifications: ['MD', 'DM'], feesPerCunsultation: 2000, timings: ['11:00 AM - 02:00 PM', '05:00 PM - 08:00 PM'] },
      { user: createdUsers[3]._id, specialization: 'Neurology', experience: 14, qualifications: ['MD', 'PhD'], feesPerCunsultation: 1800, timings: ['10:00 AM - 01:00 PM', '04:00 PM - 07:00 PM'] },
      // Pediatrics
      { user: createdUsers[4]._id, specialization: 'Pediatrics', experience: 10, qualifications: ['MD', 'DCH'], feesPerCunsultation: 800, timings: ['09:00 AM - 12:00 PM', '04:00 PM - 07:00 PM'] },
      { user: createdUsers[5]._id, specialization: 'Pediatrics', experience: 15, qualifications: ['MD', 'FAAP'], feesPerCunsultation: 1000, timings: ['10:00 AM - 01:00 PM', '05:00 PM - 08:00 PM'] },
      // Orthopedics
      { user: createdUsers[6]._id, specialization: 'Orthopedics', experience: 16, qualifications: ['MS', 'DNB'], feesPerCunsultation: 1500, timings: ['10:00 AM - 02:00 PM'] },
      { user: createdUsers[7]._id, specialization: 'Orthopedics', experience: 9, qualifications: ['MS', 'Fellowship'], feesPerCunsultation: 1200, timings: ['03:00 PM - 08:00 PM'] },
      // Dentistry
      { user: createdUsers[8]._id, specialization: 'Dentistry', experience: 11, qualifications: ['MDS'], feesPerCunsultation: 700, timings: ['10:00 AM - 01:00 PM', '04:00 PM - 08:00 PM'] },
      { user: createdUsers[9]._id, specialization: 'Dentistry', experience: 7, qualifications: ['BDS', 'MDS'], feesPerCunsultation: 600, timings: ['09:00 AM - 12:00 PM', '03:00 PM - 07:00 PM'] },
      // Ophthalmology
      { user: createdUsers[10]._id, specialization: 'Ophthalmology', experience: 14, qualifications: ['MS', 'DO'], feesPerCunsultation: 1000, timings: ['10:00 AM - 01:00 PM', '04:00 PM - 08:00 PM'] },
      { user: createdUsers[11]._id, specialization: 'Ophthalmology', experience: 10, qualifications: ['MS', 'FRCS'], feesPerCunsultation: 1100, timings: ['09:00 AM - 12:00 PM', '03:00 PM - 06:00 PM'] }
    ];

    await Doctor.create(doctorProfiles);

    console.log('Successfully seeded 3 doctors into the database!');
    process.exit();
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedDoctors();
