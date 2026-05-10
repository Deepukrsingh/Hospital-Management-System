import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaStar, FaMapMarkerAlt, FaStethoscope, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../store/slices/doctorSlice';
import { bookAppointment, clearAppointmentState } from '../store/slices/appointmentSlice';
import { toast } from 'react-toastify';

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  // Booking form state
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { doctors, loading } = useSelector((state) => state.doctors);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { success, loading: bookingLoading } = useSelector((state) => state.appointments);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success('Appointment booked successfully!');
      setIsModalOpen(false);
      dispatch(clearAppointmentState());
      // Navigate to patient dashboard after booking
      navigate('/dashboard/patient');
    }
  }, [success, dispatch, navigate]);

  const specializations = ['All', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dentistry', 'Ophthalmology'];

  const filteredDoctors = doctors?.filter(doctor => {
    const doctorName = doctor.user?.name || '';
    const matchesSearch = doctorName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (doctor.specialization && doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSpec = selectedSpec === 'All' || doctor.specialization === selectedSpec;
    return matchesSearch && matchesSpec;
  }) || [];

  const getDoctorImage = (name) => {
    if (!name) return null;
    if (name.includes('Rajesh')) return '/images/doctors/dr_rajesh.png';
    if (name.includes('Anjali')) return '/images/doctors/dr_anjali.png';
    if (name.includes('Vikram')) return '/images/doctors/dr_vikram.png';
    if (name.includes('Priya')) return '/images/doctors/dr_priya.png';
    if (name.includes('Sanjay')) return '/images/doctors/dr_sanjay.png';
    if (name.includes('Kavita')) return '/images/doctors/dr_kavita.png';
    if (name.includes('Amit')) return '/images/doctors/dr_amit.png';
    if (name.includes('Neha')) return '/images/doctors/dr_neha.png';
    if (name.includes('Rohan')) return '/images/doctors/dr_rohan.png';
    if (name.includes('Sneha')) return '/images/doctors/dr_sneha.png';
    if (name.includes('Arun')) return '/images/doctors/dr_arun.png';
    if (name.includes('Pooja')) return '/images/doctors/dr_pooja.png';
    return null;
  };

  const handleBookClick = (doctor) => {
    if (!isAuthenticated) {
      toast.info('Please login to book an appointment');
      navigate('/login');
      return;
    }
    if (user?.role !== 'Patient') {
      toast.error('Only patients can book appointments');
      return;
    }
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!date || !time) {
      toast.error('Please select both date and time');
      return;
    }

    const appointmentData = {
      doctorId: selectedDoctor._id,
      doctorInfo: {
        name: selectedDoctor.user?.name,
        specialization: selectedDoctor.specialization
      },
      userInfo: {
        name: user?.name,
        email: user?.email
      },
      date,
      time
    };

    dispatch(bookAppointment(appointmentData));
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Find Your Doctor</h1>
          <p className="text-lg text-gray-600">Browse through our extensive list of highly qualified medical professionals and book your appointment today.</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search doctors by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-primary focus:border-primary outline-none transition"
              />
            </div>
            <div className="md:w-64">
              <select
                value={selectedSpec}
                onChange={(e) => setSelectedSpec(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-primary focus:border-primary outline-none transition appearance-none cursor-pointer"
              >
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading doctors...</p>
          </div>
        ) : (
          <>
            {/* Doctors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredDoctors.map((doctor, index) => (
                <motion.div
                  key={doctor._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden bg-primary/10 flex items-center justify-center">
                    {getDoctorImage(doctor.user?.name) ? (
                      <img src={getDoctorImage(doctor.user?.name)} alt={doctor.user?.name} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <FaStethoscope className="text-6xl text-primary/30" />
                    )}
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.user?.name || 'Unknown Doctor'}</h3>
                        <p className="text-primary font-medium flex items-center gap-2 text-sm">
                          <FaStethoscope /> {doctor.specialization}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2 text-sm text-gray-600 flex-grow">
                      <p className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">Experience:</span> {doctor.experience} years
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">Fees:</span> ${doctor.feesPerCunsultation || doctor.fees || 100}
                      </p>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-sm font-medium text-green-600">
                        ● Available
                      </span>
                      <button 
                        onClick={() => handleBookClick(doctor)}
                        className="px-4 py-2 rounded-full text-sm font-bold transition bg-primary/10 text-primary hover:bg-primary hover:text-white"
                      >
                        Book
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {filteredDoctors.length === 0 && (
              <div className="text-center py-20">
                <h3 className="text-xl text-gray-600">No doctors found matching your criteria.</h3>
                <button 
                  onClick={() => { setSearchTerm(''); setSelectedSpec('All'); }}
                  className="mt-4 text-primary font-medium hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Booking Modal */}
      {isModalOpen && selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Book Appointment</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <FaTimes size={20} />
              </button>
            </div>
            
            <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Doctor</p>
                <p className="font-semibold text-gray-900">{selectedDoctor.user?.name}</p>
                <p className="text-sm text-primary">{selectedDoctor.specialization}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                <input 
                  type="date" 
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Time Slot</label>
                {selectedDoctor.timings && selectedDoctor.timings.length > 0 ? (
                  <select
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary outline-none bg-white"
                  >
                    <option value="" disabled>Select a time slot</option>
                    {selectedDoctor.timings.map((slot, index) => (
                      <option key={index} value={slot}>{slot}</option>
                    ))}
                  </select>
                ) : (
                  <input 
                    type="time" 
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary outline-none"
                  />
                )}
              </div>
              
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={bookingLoading}
                  className={`flex-1 py-3 px-4 rounded-xl text-white font-medium transition ${bookingLoading ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'}`}
                >
                  {bookingLoading ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Doctors;
