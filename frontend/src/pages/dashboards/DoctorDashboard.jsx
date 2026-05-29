import React, { useState, useEffect } from 'react';
import { FaUserMd, FaCalendarCheck, FaClock, FaUsers, FaFileMedical, FaPlus, FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyAppointments, updateAppointmentStatus, addPrescription } from '../../store/slices/appointmentSlice';
import { fetchPatientRecordsById, clearViewedPatientRecords } from '../../store/slices/patientSlice';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const DoctorDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { appointments, loading } = useSelector((state) => state.appointments);
  const { viewedPatientRecords, loading: patientLoading } = useSelector((state) => state.patient);
  
  const [activeTab, setActiveTab] = useState('appointments');
  const dispatch = useDispatch();
  const location = useLocation();

  // Prescription Modal State
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [selectedAptId, setSelectedAptId] = useState(null);
  const [prescriptionForm, setPrescriptionForm] = useState({
    medicines: [{ name: '', dosage: '', duration: '', instructions: '' }],
    notes: ''
  });

  // History Modal State
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedPatientName, setSelectedPatientName] = useState('');

  useEffect(() => {
    if (activeTab === 'appointments') {
      dispatch(fetchMyAppointments());
    }
  }, [activeTab, dispatch]);

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await dispatch(updateAppointmentStatus({ id, status })).unwrap();
      toast.success(`Appointment marked as ${status}`);
    } catch (err) {
      toast.error(err || 'Failed to update status');
    }
  };

  const handleOpenPrescription = (id, existingPrescription) => {
    setSelectedAptId(id);
    if (existingPrescription) {
      setPrescriptionForm({
        medicines: existingPrescription.medicines || [{ name: '', dosage: '', duration: '', instructions: '' }],
        notes: existingPrescription.notes || ''
      });
    } else {
      setPrescriptionForm({
        medicines: [{ name: '', dosage: '', duration: '', instructions: '' }],
        notes: ''
      });
    }
    setShowPrescriptionModal(true);
  };

  const handleOpenHistory = (userId, patientName) => {
    setSelectedPatientName(patientName);
    dispatch(fetchPatientRecordsById(userId));
    setShowHistoryModal(true);
  };

  const handleCloseHistory = () => {
    setShowHistoryModal(false);
    dispatch(clearViewedPatientRecords());
  };

  const handleAddMedicine = () => {
    setPrescriptionForm({
      ...prescriptionForm,
      medicines: [...prescriptionForm.medicines, { name: '', dosage: '', duration: '', instructions: '' }]
    });
  };

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...prescriptionForm.medicines];
    updatedMedicines[index][field] = value;
    setPrescriptionForm({ ...prescriptionForm, medicines: updatedMedicines });
  };

  const handleRemoveMedicine = (index) => {
    const updatedMedicines = [...prescriptionForm.medicines];
    updatedMedicines.splice(index, 1);
    setPrescriptionForm({ ...prescriptionForm, medicines: updatedMedicines });
  };

  const handleSavePrescription = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addPrescription({ id: selectedAptId, prescriptionData: prescriptionForm })).unwrap();
      toast.success('Prescription saved successfully');
      setShowPrescriptionModal(false);
    } catch (err) {
      toast.error(err || 'Failed to save prescription');
    }
  };

  const doctorName = user?.name || "Dr. Smith";
  const pendingAppointmentsCount = appointments ? appointments.filter(a => a.status === 'pending').length : 0;

  return (
    <div className="min-h-screen text-white py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Doctor Dashboard</h1>
          <p className="text-gray-400 mt-2">Welcome back, {doctorName}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-dark rounded-xl shadow-sm border border-white/10 p-6 flex items-center space-x-4">
            <div className="bg-primary/10 text-primary border border-primary/20 p-4 rounded-full text-2xl">
              <FaCalendarCheck />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Pending Appointments</p>
              <h3 className="text-2xl font-bold text-white">{pendingAppointmentsCount}</h3>
            </div>
          </div>
          <div className="glass-dark rounded-xl shadow-sm border border-white/10 p-6 flex items-center space-x-4">
            <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 p-4 rounded-full text-2xl">
              <FaUsers />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Patients</p>
              <h3 className="text-2xl font-bold text-white">240</h3>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 space-y-2">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'appointments' ? 'bg-primary text-white shadow-md' : 'glass-dark text-gray-300 hover:bg-white/5 hover:text-white hover:border-white/10'}`}
            >
              <FaCalendarCheck />
              <span className="font-medium">Appointments</span>
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'schedule' ? 'bg-primary text-white shadow-md' : 'glass-dark text-gray-300 hover:bg-white/5 hover:text-white hover:border-white/10'}`}
            >
              <FaClock />
              <span className="font-medium">My Schedule</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'profile' ? 'bg-primary text-white shadow-md' : 'glass-dark text-gray-300 hover:bg-white/5 hover:text-white hover:border-white/10'}`}
            >
              <FaUserMd />
              <span className="font-medium">My Profile</span>
            </button>
          </div>

          <div className="flex-1 glass-dark rounded-2xl shadow-sm border border-white/10 p-8">
            {activeTab === 'appointments' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 border-b pb-4">Patient Appointments</h2>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-400">Loading appointments...</p>
                  </div>
                ) : appointments && appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((apt) => (
                      <div key={apt._id} className="border rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center glass-dark gap-4">
                        <div>
                          <h4 className="font-bold text-white">{apt.userInfo?.name || 'Patient'}</h4>
                          <p className="text-sm text-gray-400">{apt.userInfo?.email || 'No email provided'}</p>
                          <div className="mt-2 text-sm font-medium text-primary flex flex-wrap items-center gap-3">
                            <span><FaCalendarCheck className="inline mr-1" /> {apt.date}, {apt.time}</span>
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                              apt.appointmentType === 'Online' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'
                            }`}>
                              {apt.appointmentType || 'OPD'}
                            </span>
                            <span className="text-gray-300 font-bold">Fee: ₹{apt.fees || 0}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-3 py-1 rounded-full font-bold border ${
                              apt.status === 'approved' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25' :
                              apt.status === 'completed' ? 'bg-white/10 text-gray-400 border-white/20' :
                              apt.status === 'rejected' ? 'bg-red-500/15 text-red-400 border-red-500/25' :
                              'bg-blue-500/15 text-blue-400 border-blue-500/25'
                            }`}>
                              {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                            </span>
                            {apt.prescription && (
                              <span className="text-xs px-3 py-1 rounded-full font-bold bg-purple-500/15 text-purple-400 border border-purple-500/25">
                                Prescribed
                              </span>
                            )}
                          </div>
                          
                          {apt.status === 'pending' && (
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleStatusUpdate(apt._id, 'approved')}
                                className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 px-3 py-1 rounded-md text-sm font-bold hover:bg-emerald-500/25 transition"
                              >
                                Approve
                              </button>
                              <button 
                                onClick={() => handleStatusUpdate(apt._id, 'rejected')}
                                className="bg-red-500/15 text-red-400 border border-red-500/25 px-3 py-1 rounded-md text-sm font-bold hover:bg-red-500/25 transition"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                          <div className="flex gap-2">
                            {apt.status === 'approved' && (
                              <button 
                                onClick={() => handleStatusUpdate(apt._id, 'completed')}
                                className="bg-blue-500/15 text-blue-400 border border-blue-500/25 px-3 py-1 rounded-md text-sm font-bold hover:bg-blue-500/25 transition"
                              >
                                Mark Completed
                              </button>
                            )}
                            {(apt.status === 'approved' || apt.status === 'completed') && (
                              <button 
                                onClick={() => handleOpenPrescription(apt._id, apt.prescription)}
                                className="bg-purple-500/15 text-purple-400 border border-purple-500/25 px-3 py-1 rounded-md text-sm font-bold hover:bg-purple-500/25 transition flex items-center gap-1"
                              >
                                <FaFileMedical /> {apt.prescription ? 'Edit Prescription' : 'Prescribe'}
                              </button>
                            )}
                            <button
                              onClick={() => handleOpenHistory(apt.userId?._id || apt.userId, apt.userInfo?.name || 'Patient')}
                              className="bg-indigo-500/15 text-indigo-400 border border-indigo-500/25 px-3 py-1 rounded-md text-sm font-bold hover:bg-indigo-500/25 transition flex items-center gap-1"
                            >
                              <FaUsers /> View History
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 glass-dark rounded-xl border border-dashed border-white/10">
                    <p className="text-gray-400">You have no appointments.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'schedule' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 border-b pb-4">Manage Availability</h2>
                <p className="text-gray-400">Feature coming soon.</p>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Doctor Profile</h2>
                <p className="text-gray-400">Feature coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Prescription Modal */}
      {showPrescriptionModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-dark border border-white/10 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto text-white">
            <div className="p-6 border-b border-white/10 sticky top-0 bg-slate-900 z-10 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <FaFileMedical className="text-primary" /> Write Prescription
              </h2>
              <button onClick={() => setShowPrescriptionModal(false)} className="text-gray-400 hover:text-white transition-colors">
                <FaTimes size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSavePrescription} className="p-6 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Medicines</h3>
                  <button type="button" onClick={handleAddMedicine} className="flex items-center gap-1 text-sm bg-primary/10 text-primary px-3 py-1 rounded-md hover:bg-primary/20 transition font-medium">
                    <FaPlus /> Add Medicine
                  </button>
                </div>
                
                <div className="space-y-4">
                  {prescriptionForm.medicines.map((med, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-white/5 p-4 rounded-xl border border-white/5">
                      <div className="md:col-span-3">
                        <label className="block text-xs font-medium text-gray-300 mb-1">Medicine Name</label>
                        <input type="text" required value={med.name} onChange={(e) => handleMedicineChange(index, 'name', e.target.value)} className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-white transition-all" placeholder="e.g. Amoxicillin" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-300 mb-1">Dosage</label>
                        <input type="text" required value={med.dosage} onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)} className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-white transition-all" placeholder="e.g. 500mg" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-300 mb-1">Duration</label>
                        <input type="text" required value={med.duration} onChange={(e) => handleMedicineChange(index, 'duration', e.target.value)} className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-white transition-all" placeholder="e.g. 5 Days" />
                      </div>
                      <div className="md:col-span-4">
                        <label className="block text-xs font-medium text-gray-300 mb-1">Instructions</label>
                        <input type="text" required value={med.instructions} onChange={(e) => handleMedicineChange(index, 'instructions', e.target.value)} className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-white transition-all" placeholder="e.g. After meals" />
                      </div>
                      <div className="md:col-span-1 flex justify-center">
                        <button type="button" onClick={() => handleRemoveMedicine(index)} disabled={prescriptionForm.medicines.length === 1} className="text-red-500 hover:text-red-400 disabled:opacity-50 mb-2">
                          <FaTimes size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">General Notes / Advice</label>
                <textarea 
                  value={prescriptionForm.notes} 
                  onChange={(e) => setPrescriptionForm({...prescriptionForm, notes: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-white transition-all" 
                  rows="3" 
                  placeholder="Additional instructions, diet plans, next visit details..."
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setShowPrescriptionModal(false)} className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl font-medium text-gray-300 hover:bg-white/10 transition">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="px-6 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition shadow-md">
                  {loading ? 'Saving...' : 'Save Prescription'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-dark border border-white/10 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col text-white">
            <div className="p-6 border-b border-white/10 bg-slate-900 z-10 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <FaUsers className="text-indigo-400" /> Medical History: {selectedPatientName}
              </h2>
              <button onClick={handleCloseHistory} className="text-gray-400 hover:text-white transition-colors">
                <FaTimes size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 bg-transparent">
              {patientLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-4 text-gray-400">Loading patient records...</p>
                </div>
              ) : viewedPatientRecords ? (
                <div className="space-y-8">
                  {/* Medical History Section */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
                      <FaFileMedical className="text-indigo-400" /> Past Conditions
                    </h3>
                    {viewedPatientRecords.medicalHistory && viewedPatientRecords.medicalHistory.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {viewedPatientRecords.medicalHistory.map((item, idx) => (
                          <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold text-white">{item.condition}</h4>
                              <span className={`text-xs px-2 py-1 rounded-full font-bold border ${
                                item.status === 'Active' ? 'bg-red-500/15 text-red-400 border-red-500/25' :
                                item.status === 'Resolved' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25' :
                                'bg-amber-500/15 text-amber-400 border-amber-500/25'
                              }`}>
                                {item.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-400">Diagnosed: {item.dateDiagnosed}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 bg-white/5 rounded-xl border border-dashed border-white/10">
                        <p className="text-gray-400">No past medical history recorded.</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Lab Reports Section */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
                      <FaFileMedical className="text-primary" /> Lab Reports
                    </h3>
                    {viewedPatientRecords.labReports && viewedPatientRecords.labReports.length > 0 ? (
                      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-sm">
                        <table className="min-w-full divide-y divide-white/10">
                          <thead className="bg-white/5">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Test Name</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Result</th>
                            </tr>
                          </thead>
                          <tbody className="bg-transparent divide-y divide-white/10">
                            {viewedPatientRecords.labReports.map((report, idx) => (
                              <tr key={idx}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{report.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{report.testName}</td>
                                <td className="px-6 py-4 text-sm text-gray-300">{report.result}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-6 bg-white/5 rounded-xl border border-dashed border-white/10">
                        <p className="text-gray-400">No lab reports available.</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-red-400">Failed to load patient records.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
