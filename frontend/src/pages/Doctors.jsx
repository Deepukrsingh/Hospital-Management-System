import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaStar, FaMapMarkerAlt, FaStethoscope, FaTimes, FaCalendarAlt, FaMoneyBillWave, FaEye, FaUser } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../store/slices/doctorSlice';
import { bookAppointment, clearAppointmentState, fetchBookedSlots } from '../store/slices/appointmentSlice';
import { toast } from 'react-toastify';

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  // Profile Detail Modal State
  const [profileDoctor, setProfileDoctor] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  
  // Booking form state
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('OPD');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { doctors, loading } = useSelector((state) => state.doctors);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { success, loading: bookingLoading, error, bookedSlots } = useSelector((state) => state.appointments);

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
    if (error) {
      toast.error(error);
      dispatch(clearAppointmentState());
    }
  }, [success, error, dispatch, navigate]);

  useEffect(() => {
    if (selectedDoctor && date) {
      dispatch(fetchBookedSlots({ doctorId: selectedDoctor._id, date }));
      setTime('');
    }
  }, [selectedDoctor, date, dispatch]);

  const specializations = ['All', 'Critical Care', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dentistry', 'Ophthalmology'];

  const filteredDoctors = doctors?.filter(doctor => {
    const doctorName = doctor.user?.name || '';
    const matchesSearch = doctorName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (doctor.specialization && doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSpec = selectedSpec === 'All' || doctor.specialization === selectedSpec;
    return matchesSearch && matchesSpec;
  }) || [];

  const getDoctorImage = (name) => {
    if (!name) return null;
    if (name.includes('Farrukh') || name.includes('Ansari')) return '/images/doctors/dr_farrukh.png';
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

  const getDoctorDetails = (doctor) => {
    const name = doctor.user?.name || '';
    const specialization = doctor.specialization || '';
    const experience = doctor.experience || 0;

    // Use DB properties if populated
    if (doctor.qualifications && (doctor.qualifications.length > 0 || typeof doctor.qualifications === 'string')) {
      const qText = Array.isArray(doctor.qualifications) 
        ? doctor.qualifications.join(', ') 
        : doctor.qualifications;

      return {
        qualifications: qText,
        designation: doctor.designation || (experience > 15 ? 'Senior Consultant & HOD' : experience > 10 ? 'Senior Consultant' : 'Consultant'),
        department: doctor.department || `Medicure Department of ${specialization}`,
        about: doctor.about || `Dr. ${name.replace('Dr. ', '')} is an esteemed medical professional specializing in ${specialization} with over ${experience} years of practice.`,
        education: doctor.education && doctor.education.length > 0 ? doctor.education : [
          `MBBS, Medical College (1998 - 2004)`,
          `MD / MS (${specialization}) (2005 - 2008)`
        ],
        experienceList: doctor.experienceList && doctor.experienceList.length > 0 ? doctor.experienceList : [
          `Consultant, Department of ${specialization} (2008 - Present)`
        ]
      };
    }

    const normalizedName = name || '';
    if (normalizedName.includes('Farrukh') || normalizedName.includes('Ansari')) {
      return {
        qualifications: 'MD(Anaesthesiology)(Reg. No.-19519)',
        designation: 'Group Medical Director',
        department: 'Chandan Institute of Critical Care and Anaesthesiology',
        about: 'Dr. Farrukh Ansari is a well-known anaesthesiologist and Intensivist in the city of Lucknow with a career spanning over nearly two decades. After completing MD in anaesthesiology from the prestigious JN Medical College, AMU, Aligarh, Dr. Ansari has vast experience in managing patients undergoing major surgeries, including liver and kidney transplant. He has been actively involved in training of undergraduate and post graduate students during his tenure first as Senior resident at SGPGIMS, Lucknow and then as lecture at JN Medical College, AMU, Aligarh. He is still involved in various academic activities, like CMEs, Workshops etc., at various centres in India. He has several publications in reputed national and international journals. Under his leadership the department of anaesthesiology and critical care has delivered world class services, including ECMO, to patients from Lucknow and surrounding areas. He has been instrumental in starting DNB program at Chandan Hospital, Lucknow.',
        education: [
          'MBBS, JN Medical College, AMU, Aligarh (August 1992 — Dec 1997)',
          'MD Anaesthesiology, JN Medical College, AMU, Aligarh (July 1999 — July 2002)'
        ],
        experienceList: [
          'Senior Resident, Department of Anaesthesiology, JN Medical College, AMU, Aligarh (July 2002 — March 2003)',
          'Senior Resident, Dept. of Anaesthesiology Renal and liver transplant surgeries, Sanjay Gandhi Post Graduate Institute of Medical Sciences, Lucknow (April 2003 — June 2004)',
          'Lecturer, Department of Anaesthesiology Undergraduate and post graduate training, JN Medical College, AMU, Aligarh (June 2004 — June 2006)',
          'Specialist Anaesthesiologist for various specialty surgeries, Almana General Hospital, Al Jubail, Kingdom of Saudi Arabia (November 2006 — March 2011)',
          'Associate Consultant, Anaesthesiology, Sahara Hospital, Lucknow India (June 2011 — April 2014)',
          'Head, Department of Anesthesia & Critical Care (Managing a team of five anaesthesia specialists. Providing anaesthesia for various specialty surgeries), Charak Hospital, Lucknow (May 2014 — March 2016)'
        ]
      };
    }

    // Generics for other doctors
    const spec = specialization || 'General Medicine';
    const years = experience || 10;
    return {
      qualifications: `MD, DM (${spec}) (Reg. No.-${Math.floor(10000 + Math.random() * 90000)})`,
      designation: years > 15 ? 'Senior Consultant & HOD' : years > 10 ? 'Senior Consultant' : 'Consultant',
      department: `Medicure Department of ${spec}`,
      about: `Dr. ${normalizedName.replace('Dr. ', '')} is an esteemed medical professional specializing in ${spec} with over ${years} years of dedicated practice. Known for clinical excellence and patient-centric care, Dr. ${normalizedName.replace('Dr. ', '')} has extensive experience in both complex diagnostics and advanced therapies within their field.`,
      education: [
        `MBBS, National Medical University (1998 - 2004)`,
        `MD / MS (${spec}), Post Graduate Institute of Medical Sciences (2005 - 2008)`
      ],
      experienceList: [
        `Junior Resident, Department of ${spec}, City General Hospital (2008 - 2011)`,
        `Consultant, Department of ${spec}, Premier Care Hospital (2011 - 2016)`,
        `Senior Specialist, Medicure Medical Center (2016 - Present)`
      ]
    };
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
    setDate('');
    setTime('');
    setAppointmentType('OPD');
    setIsModalOpen(true);
  };

  const handleViewProfile = (doctor) => {
    setProfileDoctor(doctor);
    setIsProfileModalOpen(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!date || !time) {
      toast.error('Please select both date and time');
      return;
    }

    const calculatedFees = appointmentType === 'Online' 
      ? Math.round((selectedDoctor.feesPerCunsultation || 100) * 0.4) 
      : (selectedDoctor.feesPerCunsultation || 100);

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
      time,
      appointmentType,
      fees: calculatedFees
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
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Find Your <span className="text-gradient">Doctor</span></h1>
            <p className="text-xl text-gray-400">Browse through our extensive list of highly qualified medical professionals and book your appointment today.</p>
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
                className="w-full pl-14 pr-4 py-4 glass-dark border-none rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all font-medium text-gray-300 shadow-sm"
              />
            </div>
            <div className="md:w-64 relative">
              <select
                value={selectedSpec}
                onChange={(e) => setSelectedSpec(e.target.value)}
                className="w-full pl-4 pr-10 py-4 glass-dark border-none rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all font-medium text-gray-300 appearance-none cursor-pointer shadow-sm"
              >
                {specializations.map(spec => (
                  <option key={spec} value={spec} className="bg-slate-900">{spec}</option>
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
            <p className="text-lg font-medium text-gray-400">Loading excellent doctors...</p>
          </div>
        ) : (
          <>
            {/* Doctors Grid - Two Columns of Horizontal Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredDoctors.map((doctor, index) => {
                const details = getDoctorDetails(doctor);
                return (
                  <motion.div
                    key={doctor._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-dark rounded-3xl overflow-hidden shadow-sm hover-glow-blue group flex flex-col sm:flex-row items-center sm:items-stretch gap-6 p-6 border border-white/5"
                  >
                    {/* Circle Doctor Image Frame */}
                    <div className="flex-shrink-0 flex items-center justify-center">
                      {getDoctorImage(doctor.user?.name) ? (
                        <img 
                          src={getDoctorImage(doctor.user?.name)} 
                          alt={doctor.user?.name} 
                          className="w-32 h-32 md:w-36 md:h-36 object-cover rounded-full border-4 border-primary/20 shadow-lg transition-transform duration-500 group-hover:scale-105" 
                        />
                      ) : (
                        <div className="w-32 h-32 md:w-36 md:h-36 rounded-full glass-dark flex items-center justify-center border-4 border-primary/20 shadow-lg">
                          <FaStethoscope className="text-4xl text-primary/50" />
                        </div>
                      )}
                    </div>
                    
                    {/* Details Column */}
                    <div className="flex-grow flex flex-col items-center sm:items-start text-center sm:text-left w-full">
                      <div className="flex flex-wrap items-center justify-between gap-2 w-full mb-1">
                        <h3 className="text-xl font-bold text-white leading-tight">{doctor.user?.name || 'Unknown Doctor'}</h3>
                        <span className="glass-dark px-3 py-1 rounded-full text-xs font-bold text-primary flex items-center gap-1 shadow-sm border border-primary/10">
                          <FaStar className="text-yellow-400" /> 4.9
                        </span>
                      </div>
                      
                      <p className="text-xs text-gray-400 font-semibold mb-2">
                        {details.qualifications}
                      </p>
                      
                      <div className="w-full h-px bg-white/10 my-2"></div>
                      
                      <p className="text-base font-bold text-primary-light mb-0.5">
                        {details.designation}
                      </p>
                      
                      <p className="text-xs text-gray-400 font-medium mb-4">
                        {details.department}
                      </p>

                      {/* Info tags row */}
                      <div className="flex flex-wrap gap-3 mb-5 text-xs text-gray-300">
                        <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-xl font-bold flex items-center gap-1">
                          <FaCalendarAlt className="text-primary text-xs" /> Exp: {doctor.experience} Yrs
                        </span>
                        <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-xl font-bold flex items-center gap-1">
                          <FaMoneyBillWave className="text-green-400 text-xs" /> Fee: ₹{doctor.feesPerCunsultation || doctor.fees || 100}
                        </span>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex gap-3 w-full mt-auto">
                        <button
                          onClick={() => handleViewProfile(doctor)}
                          className="flex-1 py-3 px-2 rounded-xl text-xs font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 transition-colors flex items-center justify-center gap-1.5"
                        >
                          <FaEye /> View Profile
                        </button>
                        <button
                          onClick={() => handleBookClick(doctor)}
                          className="flex-1 py-3 px-2 rounded-xl text-xs font-bold bg-gradient-premium text-white hover:shadow-premium-hover transition-all transform hover:-translate-y-0.5"
                        >
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {filteredDoctors.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 glass-dark rounded-3xl border border-white/5 shadow-sm max-w-2xl mx-auto"
              >
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaSearch className="text-3xl text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No doctors found</h3>
                <p className="text-gray-400 mb-6">We couldn't find any doctors matching your current filters.</p>
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
            className="glass-dark rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-white/10"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5">
              <h3 className="text-2xl font-extrabold text-white">Book Appointment</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-red-500/20 hover:text-red-500 transition-colors"
              >
                <FaTimes size={16} />
              </button>
            </div>
            
            <form onSubmit={handleBookingSubmit} className="p-6 space-y-6">
              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm glass-dark">
                  {getDoctorImage(selectedDoctor.user?.name) ? (
                    <img src={getDoctorImage(selectedDoctor.user?.name)} alt={selectedDoctor.user?.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <FaStethoscope className="text-xl text-primary/50" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-extrabold text-white text-lg">{selectedDoctor.user?.name}</p>
                  <p className="text-sm font-bold text-primary">{selectedDoctor.specialization}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Consultation Mode</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setAppointmentType('OPD')}
                      className={`py-3 rounded-xl border text-sm font-bold transition-all ${
                        appointmentType === 'OPD'
                          ? 'bg-primary text-white border-primary shadow-md'
                          : 'glass-dark text-gray-300 border-white/10 hover:glass-dark'
                      }`}
                    >
                      Physical Visit (OPD)
                      <span className="block text-xs font-normal text-gray-400 mt-1">
                        Fee: ₹{selectedDoctor.feesPerCunsultation || 100}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAppointmentType('Online')}
                      className={`py-3 rounded-xl border text-sm font-bold transition-all ${
                        appointmentType === 'Online'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                          : 'glass-dark text-gray-300 border-white/10 hover:glass-dark'
                      }`}
                    >
                      Online Consultation
                      <span className="block text-xs font-normal text-green-400 mt-1">
                        Fee: ₹{Math.round((selectedDoctor.feesPerCunsultation || 100) * 0.4)} (60% Off)
                      </span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Select Date</label>
                  <input 
                    type="date" 
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3.5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-medium text-gray-300 bg-white/5 focus:glass-dark"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Select Time Slot</label>
                  <div className="relative">
                    {!date ? (
                      <div className="w-full px-4 py-3.5 border border-white/10 rounded-xl text-gray-400 bg-white/5 font-medium">
                        Please select a date first
                      </div>
                    ) : selectedDoctor.timings && selectedDoctor.timings.length > 0 ? (
                      <select
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full pl-4 pr-10 py-3.5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-medium text-gray-300 bg-white/5 focus:glass-dark appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-slate-900" disabled>Choose an available slot</option>
                        {selectedDoctor.timings.map((slot, index) => {
                          const isBooked = bookedSlots && bookedSlots.includes(slot);
                          return (
                            <option key={index} value={slot} disabled={isBooked} className="bg-slate-900 text-white">
                              {slot} {isBooked ? ' - Booked' : ''}
                            </option>
                          );
                        })}
                      </select>
                    ) : (
                      <input 
                        type="time" 
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-4 py-3.5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-medium text-gray-300 bg-white/5 focus:glass-dark"
                      />
                    )}
                    {date && selectedDoctor.timings && selectedDoctor.timings.length > 0 && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
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
                  className="w-1/3 py-4 border border-white/10 rounded-xl text-gray-300 font-bold hover:bg-white/5 transition-colors"
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

      {/* Profile Detail Modal */}
      <AnimatePresence>
        {isProfileModalOpen && profileDoctor && (() => {
          const details = getDoctorDetails(profileDoctor);
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="glass-dark rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden border border-white/10 my-8 flex flex-col"
              >
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5">
                  <h3 className="text-xl font-extrabold text-white uppercase tracking-wider">Doctor Profile</h3>
                  <button 
                    onClick={() => setIsProfileModalOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-red-500/20 hover:text-red-500 transition-colors"
                  >
                    <FaTimes size={16} />
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh] custom-scrollbar">
                  
                  {/* Profile Section */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-6 p-6 glass-dark rounded-3xl border border-white/5">
                    <div className="flex-shrink-0 flex items-center justify-center">
                      {getDoctorImage(profileDoctor.user?.name) ? (
                        <img 
                          src={getDoctorImage(profileDoctor.user?.name)} 
                          alt={profileDoctor.user?.name} 
                          className="w-28 h-28 object-cover rounded-full border-4 border-primary/20 shadow-md" 
                        />
                      ) : (
                        <div className="w-28 h-28 rounded-full glass-dark flex items-center justify-center border-4 border-primary/20 shadow-md">
                          <FaStethoscope className="text-3xl text-primary/50" />
                        </div>
                      )}
                    </div>
                    <div className="flex-grow flex flex-col justify-center text-center sm:text-left">
                      <h2 className="text-2xl font-extrabold text-white">{profileDoctor.user?.name}</h2>
                      <p className="text-sm text-gray-400 font-semibold mt-1">{details.qualifications}</p>
                      <div className="w-full h-px bg-white/10 my-3"></div>
                      <p className="text-lg font-bold text-primary">{details.designation}</p>
                      <p className="text-xs text-gray-400 font-medium">{details.department}</p>
                    </div>
                  </div>

                  {/* About Section */}
                  <div className="space-y-2">
                    <div className="bg-primary/20 backdrop-blur-md px-4 py-2.5 text-white font-extrabold uppercase text-xs border-l-4 border-primary rounded-r-lg">
                      About
                    </div>
                    <div className="p-5 text-gray-300 text-sm leading-relaxed border border-white/5 rounded-2xl bg-white/5">
                      <p>{details.about}</p>
                    </div>
                  </div>

                  {/* Education Section */}
                  <div className="space-y-2">
                    <div className="bg-primary/20 backdrop-blur-md px-4 py-2.5 text-white font-extrabold uppercase text-xs border-l-4 border-primary rounded-r-lg">
                      Education
                    </div>
                    <div className="p-5 border border-white/5 rounded-2xl bg-white/5">
                      <ul className="list-disc pl-5 space-y-2.5 text-sm text-gray-300">
                        {details.education.map((edu, idx) => (
                          <li key={idx} className="leading-relaxed">{edu}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Experience Section */}
                  <div className="space-y-2">
                    <div className="bg-primary/20 backdrop-blur-md px-4 py-2.5 text-white font-extrabold uppercase text-xs border-l-4 border-primary rounded-r-lg">
                      Experience
                    </div>
                    <div className="p-5 border border-white/5 rounded-2xl bg-white/5">
                      <ul className="list-disc pl-5 space-y-2.5 text-sm text-gray-300 text-left">
                        {details.experienceList.map((exp, idx) => (
                          <li key={idx} className="leading-relaxed">{exp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>

                {/* Modal Footer Actions */}
                <div className="p-6 border-t border-white/10 bg-white/5 flex gap-4 mt-auto">
                  <button 
                    onClick={() => setIsProfileModalOpen(false)}
                    className="flex-1 py-3 border border-white/10 rounded-xl text-gray-300 font-bold hover:bg-white/5 transition-colors text-sm"
                  >
                    Close Profile
                  </button>
                  <button 
                    onClick={() => {
                      setIsProfileModalOpen(false);
                      handleBookClick(profileDoctor);
                    }}
                    className="flex-grow py-3 bg-gradient-premium text-white rounded-xl font-bold hover:shadow-premium-hover transition-all transform hover:-translate-y-0.5 text-sm"
                  >
                    Book Appointment
                  </button>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
};

export default Doctors;
