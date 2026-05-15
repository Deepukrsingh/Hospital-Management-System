import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaStar, FaMapMarkerAlt, FaStethoscope, FaTimes, FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';
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
    <div className="min-h-screen py-16 relative">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-4 border border-primary/20">
              Expert Care
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Find Your <span className="text-gradient">Doctor</span></h1>
            <p className="text-xl text-gray-600">Browse through our extensive list of highly qualified medical professionals and book your appointment today.</p>
          </motion.div>
        </div>

        {/* Search and Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-3xl p-4 mb-16 shadow-premium max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <FaSearch className="text-primary text-lg" />
              </div>
              <input
                type="text"
                placeholder="Search doctors by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-4 py-4 bg-white/80 border-none rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all font-medium text-gray-700 shadow-sm"
              />
            </div>
            <div className="md:w-64 relative">
              <select
                value={selectedSpec}
                onChange={(e) => setSelectedSpec(e.target.value)}
                className="w-full pl-4 pr-10 py-4 bg-white/80 border-none rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all font-medium text-gray-700 appearance-none cursor-pointer shadow-sm"
              >
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20 flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary border-l-4 border-l-transparent border-r-4 border-r-transparent mb-4"></div>
            <p className="text-lg font-medium text-gray-600">Loading excellent doctors...</p>
          </div>
        ) : (
          <>
            {/* Doctors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredDoctors.map((doctor, index) => (
                <motion.div
                  key={doctor._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-premium transition-all duration-300 group flex flex-col border border-gray-100"
                >
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary/20 to-blue-400/20 flex items-center justify-center p-4">
                    {getDoctorImage(doctor.user?.name) ? (
                      <img src={getDoctorImage(doctor.user?.name)} alt={doctor.user?.name} className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-lg transition-transform duration-500 group-hover:scale-110" />
                    ) : (
                      <div className="w-40 h-40 rounded-full bg-white flex items-center justify-center shadow-lg border-4 border-white transition-transform duration-500 group-hover:scale-110">
                        <FaStethoscope className="text-5xl text-primary/50" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary flex items-center gap-1 shadow-sm">
                      <FaStar className="text-yellow-400" /> 4.9
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col items-center text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{doctor.user?.name || 'Unknown Doctor'}</h3>
                    <p className="text-primary font-bold flex items-center gap-2 text-sm bg-primary/10 px-3 py-1 rounded-full mb-4">
                      {doctor.specialization}
                    </p>
                    
                    <div className="w-full flex justify-between px-4 py-3 bg-gray-50 rounded-2xl mb-6">
                      <div className="flex flex-col items-center">
                        <FaCalendarAlt className="text-gray-400 mb-1 text-lg" />
                        <span className="text-xs text-gray-500 font-medium">Experience</span>
                        <span className="font-bold text-gray-900">{doctor.experience} Yrs</span>
                      </div>
                      <div className="w-px bg-gray-200"></div>
                      <div className="flex flex-col items-center">
                        <FaMoneyBillWave className="text-gray-400 mb-1 text-lg" />
                        <span className="text-xs text-gray-500 font-medium">Consultation</span>
                        <span className="font-bold text-gray-900">${doctor.feesPerCunsultation || doctor.fees || 100}</span>
                      </div>
                    </div>
                    
                    <div className="w-full mt-auto">
                      <button 
                        onClick={() => handleBookClick(doctor)}
                        className="w-full py-3.5 rounded-2xl font-bold transition-all bg-gradient-premium text-white shadow-premium hover:shadow-premium-hover transform hover:-translate-y-0.5"
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {filteredDoctors.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-2xl mx-auto"
              >
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaSearch className="text-3xl text-gray-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No doctors found</h3>
                <p className="text-gray-500 mb-6">We couldn't find any doctors matching your current filters.</p>
                <button 
                  onClick={() => { setSearchTerm(''); setSelectedSpec('All'); }}
                  className="px-6 py-2 bg-primary/10 text-primary font-bold rounded-full hover:bg-primary/20 transition-colors"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Booking Modal */}
      {isModalOpen && selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-2xl font-extrabold text-gray-900">Book Appointment</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 hover:bg-red-100 hover:text-red-500 transition-colors"
              >
                <FaTimes size={16} />
              </button>
            </div>
            
            <form onSubmit={handleBookingSubmit} className="p-6 space-y-6">
              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm bg-white">
                  {getDoctorImage(selectedDoctor.user?.name) ? (
                    <img src={getDoctorImage(selectedDoctor.user?.name)} alt={selectedDoctor.user?.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <FaStethoscope className="text-xl text-primary/50" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-extrabold text-gray-900 text-lg">{selectedDoctor.user?.name}</p>
                  <p className="text-sm font-bold text-primary">{selectedDoctor.specialization}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Select Date</label>
                  <input 
                    type="date" 
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-medium text-gray-700 bg-gray-50 focus:bg-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Select Time Slot</label>
                  <div className="relative">
                    {selectedDoctor.timings && selectedDoctor.timings.length > 0 ? (
                      <select
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full pl-4 pr-10 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-medium text-gray-700 bg-gray-50 focus:bg-white appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Choose an available slot</option>
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
                        className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-medium text-gray-700 bg-gray-50 focus:bg-white"
                      />
                    )}
                    {selectedDoctor.timings && selectedDoctor.timings.length > 0 && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="pt-2 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/3 py-4 border border-gray-200 rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={bookingLoading}
                  className={`w-2/3 py-4 rounded-xl text-white font-bold transition-all shadow-premium ${bookingLoading ? 'bg-primary/70 cursor-not-allowed' : 'bg-gradient-premium hover:shadow-premium-hover transform hover:-translate-y-0.5'}`}
                >
                  {bookingLoading ? 'Processing...' : 'Confirm Booking'}
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
