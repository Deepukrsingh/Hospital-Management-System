import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileMedical, FaTimes, FaCalendarAlt, FaCheckCircle, FaUser, FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const packagesData = [
  {
    id: 'him-1',
    name: 'FULL BODY CHECK UP (HIM-1)',
    price: '999',
    description: 'Basic preventive health package designed to evaluate overall well-being and identify early signs of health issues.',
    inclusions: [
      'CBC (Complete Blood Count - 24 parameters)',
      'Blood Glucose (Fasting)',
      'Lipid Profile (Cholesterol, HDL, LDL, Triglycerides)',
      'Kidney Function Test (Urea, Creatinine, Uric Acid)',
      'Urine Routine & Microscopic analysis'
    ]
  },
  {
    id: 'him-2',
    name: 'ADVANCE FULL BODY CHECK UP (HIM-2)',
    price: '1499',
    description: 'Comprehensive health package covering essential parameters plus metabolic and thyroid hormone screenings.',
    inclusions: [
      'All 5 tests in HIM-1 Package',
      'Thyroid Profile (T3, T4, TSH)',
      'Liver Function Test (SGOT, SGPT, Bilirubin, Alkaline Phosphatase)',
      'Vitamin D (25-Hydroxy)',
      'Vitamin B12 level check'
    ]
  },
  {
    id: 'him-3',
    name: 'COMPLETE HEALTH CHECK UP (HIM-3)',
    price: '2499',
    description: 'Gold-standard screening package including cardiac risk markers, diabetes averages, and full metabolic panels.',
    inclusions: [
      'All tests in HIM-2 Package',
      'Cardiac Risk Markers (Apo A1, Apo B, hs-CRP)',
      'HbA1c (Glycated Haemoglobin for 3-month sugar average)',
      'Iron Deficiency Profile',
      'Pancreatic Profile (Serum Amylase & Lipase)'
    ]
  },
  {
    id: 'him-diabetic',
    name: 'DIABETIC CHECK-UP',
    price: '3465',
    description: 'Specialized package tailored for diabetic and pre-diabetic patients to monitor glycemic index and renal parameters.',
    inclusions: [
      'HbA1c & Fasting Blood Sugar',
      'Post-Prandial Blood Sugar',
      'Lipid Profile (Cardiac Risk evaluation)',
      'Diabetic Kidney Check (Microalbuminuria & Creatinine Ratio)',
      'Doctor / Diabetologist Consultation'
    ]
  },
  {
    id: 'him-cardiac',
    name: 'CARDIAC PROFILE',
    price: '1660',
    description: 'Targeted cardiovascular screening to analyze lipid ratios, cardiac enzymes, and electrical heart activity.',
    inclusions: [
      'ECG (Electrocardiogram)',
      'Lipid Profile (Ultra-sensitive panel)',
      'Cardiac Enzymes (CK-MB, Troponin-I)',
      'TMT (Treadmill Test / Exercise ECG)',
      'Consultation with Cardiologist'
    ]
  },
  {
    id: 'him-liver',
    name: 'LIVER PROFILE',
    price: '299',
    description: 'Screening to assess hepatic health, check enzyme secretions, and detect any inflammatory or fatty liver symptoms.',
    inclusions: [
      'SGOT & SGPT enzyme levels',
      'Bilirubin (Total, Direct, and Indirect)',
      'Alkaline Phosphatase (ALP)',
      'Serum Albumin, Globulin, and Total Protein ratio'
    ]
  },
  {
    id: 'him-kidney',
    name: 'KIDNEY PROFILE',
    price: '2499',
    description: 'Focused renal assessment package to monitor glomerular filtration rate and electrolyte balance.',
    inclusions: [
      'Serum Creatinine & Blood Urea Nitrogen (BUN)',
      'Serum Uric Acid level check',
      'Electrolyte Panel (Sodium, Potassium, Chloride)',
      'Urine Microalbumin & Routine analysis'
    ]
  }
];

const HealthCheckups = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showInclusionModal, setShowInclusionModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  // Booking Form State
  const [formData, setFormData] = useState({
    mobileNo: '',
    patientName: '',
    gender: '',
    dob: '',
    email: '',
    address: '',
    city: '',
    state: '',
    concern: '',
    acceptTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleOpenInclusions = (pkg) => {
    setSelectedPackage(pkg);
    setShowInclusionModal(true);
  };

  const handleOpenBooking = (pkg) => {
    if (!isAuthenticated) {
      toast.info('Please log in to book a health checkup package');
      navigate('/login');
      return;
    }
    setSelectedPackage(pkg);
    setFormData({
      mobileNo: user?.phone || '',
      patientName: user?.name || '',
      gender: '',
      dob: '',
      email: user?.email || '',
      address: user?.address || '',
      city: '',
      state: '',
      concern: '',
      acceptTerms: false
    });
    setShowBookModal(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      toast.error('You must accept the Terms and Conditions to proceed.');
      return;
    }
    
    // Simulate API booking request
    toast.success(`Booking request received for ${selectedPackage.name}! Our medical team will contact you shortly.`);
    setShowBookModal(false);
    navigate(user?.role === 'Patient' ? '/dashboard/patient' : '/');
  };

  return (
    <div className="min-h-screen py-16 relative">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-4 border border-primary/20">
              Preventive Healthcare
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              HEALTHY INDIA MISSION <span className="text-gradient">(HIM)</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              We recognize the importance and need for preventive health care and for this purpose we have launched the Healthy India Mission program. The HIM program aims to preserve and promote good health, to prevent disease and disability, and to facilitate early diagnosis and treatment of illness. Identify and minimize risk factors for heart disease, cancers, diabetes, and other chronic issues today.
            </p>
          </motion.div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {packagesData.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="glass-dark rounded-3xl overflow-hidden shadow-sm hover-glow-blue group flex flex-col border border-white/5 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/20 p-3 rounded-2xl text-primary text-xl">
                  <FaFileMedical />
                </div>
                <h3 className="text-lg font-bold text-white leading-tight group-hover:text-primary transition-colors">
                  {pkg.name}
                </h3>
              </div>

              <p className="text-sm text-gray-400 mb-6 flex-grow">
                {pkg.description}
              </p>

              <div className="flex justify-between items-center mb-6 pt-4 border-t border-white/5">
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Starting at</span>
                <span className="text-2xl font-black text-white">Rs. {pkg.price}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-auto">
                <button
                  onClick={() => handleOpenInclusions(pkg)}
                  className="py-3 px-2 rounded-xl text-xs font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 transition-colors"
                >
                  Test Inclusion
                </button>
                <button
                  onClick={() => handleOpenBooking(pkg)}
                  className="py-3 px-2 rounded-xl text-xs font-bold bg-gradient-premium text-white hover:shadow-premium-hover transition-all transform hover:-translate-y-0.5"
                >
                  Book Package
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Test Inclusion Modal */}
      <AnimatePresence>
        {showInclusionModal && selectedPackage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-dark rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-white/10"
            >
              <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FaFileMedical className="text-primary" /> Test Inclusions
                </h3>
                <button
                  onClick={() => setShowInclusionModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-red-500/20 hover:text-red-500 transition-colors"
                >
                  <FaTimes size={16} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-sm font-bold text-primary mb-2 uppercase tracking-wide">
                  {selectedPackage.name}
                </p>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                  {selectedPackage.inclusions.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start text-gray-300">
                      <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                      <span className="font-medium text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 border-t border-white/10 bg-white/5 text-right">
                <button
                  onClick={() => setShowInclusionModal(false)}
                  className="px-6 py-2.5 rounded-xl font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors text-sm"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Booking Modal (Form matches User Screenshot) */}
      <AnimatePresence>
        {showBookModal && selectedPackage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-dark rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden border border-white/10 my-8"
            >
              <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5">
                <div>
                  <h3 className="text-xl font-extrabold text-white">ONLINE CONSULTATION / PACKAGE BOOKING</h3>
                  <p className="text-xs text-primary font-bold mt-1">Package: {selectedPackage.name} (Rs. {selectedPackage.price})</p>
                </div>
                <button
                  onClick={() => setShowBookModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-red-500/20 hover:text-red-500 transition-colors"
                >
                  <FaTimes size={16} />
                </button>
              </div>

              <form onSubmit={handleBookingSubmit} className="p-6 space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Mobile No <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="tel"
                        name="mobileNo"
                        required
                        placeholder="Mobile No."
                        value={formData.mobileNo}
                        onChange={handleInputChange}
                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Patient Name <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        name="patientName"
                        required
                        placeholder="Patient Name"
                        value={formData.patientName}
                        onChange={handleInputChange}
                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Gender <span className="text-red-500">*</span></label>
                    <select
                      name="gender"
                      required
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-white text-sm cursor-pointer"
                    >
                      <option value="" disabled>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">DOB</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Email</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-white text-sm"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-300 mb-2">Address</label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-500" />
                      <textarea
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows="1"
                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-white text-sm resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Concern</label>
                  <textarea
                    name="concern"
                    placeholder="Concern"
                    value={formData.concern}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-white text-sm"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded border-white/10 accent-primary cursor-pointer"
                  />
                  <label htmlFor="acceptTerms" className="text-sm font-semibold text-gray-300 cursor-pointer select-none">
                    Accept <span className="text-primary underline">Terms and Conditions</span>.
                  </label>
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowBookModal(false)}
                    className="flex-1 py-3 border border-white/10 rounded-xl text-gray-300 font-bold hover:bg-white/5 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-grow py-3 bg-gradient-premium text-white rounded-xl font-bold hover:shadow-premium-hover transition-all transform hover:-translate-y-0.5 text-sm"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HealthCheckups;
