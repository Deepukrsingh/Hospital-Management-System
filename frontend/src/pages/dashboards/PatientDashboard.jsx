import React, { useState, useEffect } from 'react';
import { FaUser, FaCalendarAlt, FaHistory, FaFileMedical, FaEdit, FaPlus, FaDownload } from 'react-icons/fa';
import { generatePrescriptionPDF } from '../../utils/pdfGenerator';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyAppointments } from '../../store/slices/appointmentSlice';
import { updateUser } from '../../store/slices/authSlice';
import { fetchPatientRecords, addMedicalHistory, addLabReport, clearPatientSuccess, clearPatientError } from '../../store/slices/patientSlice';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const PatientDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { appointments, loading: aptLoading } = useSelector((state) => state.appointments);
  const { medicalHistory, labReports, loading: patientLoading, success, error: patientError } = useSelector((state) => state.patient);
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  
  // Profile edit state
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    address: ''
  });

  // History state
  const [showHistoryForm, setShowHistoryForm] = useState(false);
  const [historyForm, setHistoryForm] = useState({ condition: '', dateDiagnosed: '', status: '' });

  // Report state
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportForm, setReportForm] = useState({ testName: '', date: '', result: '' });

  const dispatch = useDispatch();

  useEffect(() => {
    if (activeTab === 'appointments') {
      dispatch(fetchMyAppointments());
    } else if (activeTab === 'history' || activeTab === 'reports') {
      dispatch(fetchPatientRecords());
    }
  }, [activeTab, dispatch]);

  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [user]);

  useEffect(() => {
    if (success) {
      setShowHistoryForm(false);
      setShowReportForm(false);
      setHistoryForm({ condition: '', dateDiagnosed: '', status: '' });
      setReportForm({ testName: '', date: '', result: '' });
      toast.success('Record added successfully!');
      dispatch(clearPatientSuccess());
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (patientError) {
      toast.error(patientError);
      dispatch(clearPatientError());
    }
  }, [patientError, dispatch]);

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(editForm));
    setIsEditing(false);
    toast.success('Profile updated!');
  };

  const handleAddHistory = (e) => {
    e.preventDefault();
    if (!historyForm.condition) return toast.error('Condition is required');
    dispatch(addMedicalHistory(historyForm));
  };

  const handleAddReport = (e) => {
    e.preventDefault();
    if (!reportForm.testName) return toast.error('Test name is required');
    dispatch(addLabReport(reportForm));
  };

  const userName = user?.name || "Patient Name";

  return (
    <div className="min-h-screen text-white py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Patient Dashboard</h1>
            <p className="text-gray-400 mt-2">Welcome back, {userName}!</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'profile' ? 'bg-primary text-white shadow-md' : 'glass-dark text-gray-300 hover:bg-white/5 hover:text-white hover:border-white/10'}`}
            >
              <FaUser />
              <span className="font-medium">My Profile</span>
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'appointments' ? 'bg-primary text-white shadow-md' : 'glass-dark text-gray-300 hover:bg-white/5 hover:text-white hover:border-white/10'}`}
            >
              <FaCalendarAlt />
              <span className="font-medium">Appointments</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'history' ? 'bg-primary text-white shadow-md' : 'glass-dark text-gray-300 hover:bg-white/5 hover:text-white hover:border-white/10'}`}
            >
              <FaHistory />
              <span className="font-medium">Medical History</span>
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'reports' ? 'bg-primary text-white shadow-md' : 'glass-dark text-gray-300 hover:bg-white/5 hover:text-white hover:border-white/10'}`}
            >
              <FaFileMedical />
              <span className="font-medium">Lab Reports</span>
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 glass-dark rounded-2xl shadow-sm border border-white/10 p-8">
            
            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div>
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                  <h2 className="text-2xl font-bold text-white">Personal Information</h2>
                  {!isEditing && (
                    <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-primary hover:text-primary-dark font-medium transition">
                      <FaEdit /> Edit
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                        <input type="text" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-white transition-all" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                        <input type="text" value={editForm.phone} onChange={(e) => setEditForm({...editForm, phone: e.target.value})} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-white transition-all" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
                        <textarea value={editForm.address} onChange={(e) => setEditForm({...editForm, address: e.target.value})} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-white transition-all" rows="3"></textarea>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition shadow-sm">Save Changes</button>
                      <button type="button" onClick={() => setIsEditing(false)} className="bg-white/5 border border-white/10 text-gray-300 px-6 py-2 rounded-lg font-medium hover:bg-white/10 transition">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                      <p className="text-white font-medium">{userName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                      <p className="text-white font-medium">{user?.email || "patient@example.com"}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                      <p className="text-white font-medium">{user?.phone || "Not provided"}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Address</label>
                      <p className="text-white font-medium">{user?.address || "Not provided"}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* APPOINTMENTS TAB */}
            {activeTab === 'appointments' && (
              <div>
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                  <h2 className="text-2xl font-bold text-white">My Appointments</h2>
                  <Link to="/doctors" className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition">
                    Book New
                  </Link>
                </div>
                {aptLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  </div>
                ) : appointments && appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((apt) => (
                      <div key={apt._id} className="border rounded-xl p-4 flex justify-between items-center glass-dark">
                        <div>
                          <h4 className="font-bold text-white">Dr. {apt.doctorInfo?.name || 'Unknown'}</h4>
                          <p className="text-sm text-gray-400">{apt.doctorInfo?.specialization || 'Consultation'}</p>
                          <div className="mt-2 text-sm font-medium text-primary flex flex-wrap items-center gap-3">
                            <span><FaCalendarAlt className="inline mr-1" /> {apt.date}, {apt.time}</span>
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                              apt.appointmentType === 'Online' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'
                            }`}>
                              {apt.appointmentType || 'OPD'}
                            </span>
                            <span className="text-gray-300 font-bold">Fee: ₹{apt.fees || 0}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`text-xs px-3 py-1 rounded-full font-bold border ${
                            apt.status === 'approved' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25' :
                            apt.status === 'completed' ? 'bg-white/10 text-gray-400 border-white/20' :
                            apt.status === 'rejected' ? 'bg-red-500/15 text-red-400 border-red-500/25' :
                            'bg-blue-500/15 text-blue-400 border-blue-500/25'
                          }`}>
                            {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                          </span>
                          
                          {apt.prescription && (
                            <button 
                              onClick={() => generatePrescriptionPDF(apt)}
                              className="bg-purple-500/15 text-purple-400 border border-purple-500/25 px-3 py-1 rounded-md text-sm font-bold hover:bg-purple-500/25 transition flex items-center gap-1"
                            >
                              <FaDownload size={12} /> Prescription
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 glass-dark rounded-xl border border-dashed border-white/10">
                    <p className="text-gray-400">You have no upcoming appointments.</p>
                  </div>
                )}
              </div>
            )}

            {/* MEDICAL HISTORY TAB */}
            {activeTab === 'history' && (
              <div>
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                  <h2 className="text-2xl font-bold text-white">Medical History</h2>
                  <button onClick={() => setShowHistoryForm(!showHistoryForm)} className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/20 transition">
                    <FaPlus /> Add Record
                  </button>
                </div>

                {showHistoryForm && (
                  <form onSubmit={handleAddHistory} className="mb-8 p-6 glass-dark rounded-xl border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Condition</label>
                        <input type="text" required value={historyForm.condition} onChange={e => setHistoryForm({...historyForm, condition: e.target.value})} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-white transition-all" placeholder="e.g. Asthma" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Date Diagnosed</label>
                        <input type="date" required value={historyForm.dateDiagnosed} onChange={e => setHistoryForm({...historyForm, dateDiagnosed: e.target.value})} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-white transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                        <select value={historyForm.status} onChange={e => setHistoryForm({...historyForm, status: e.target.value})} className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-white transition-all cursor-pointer">
                          <option value="" className="bg-slate-900">Select Status</option>
                          <option value="Active" className="bg-slate-900">Active</option>
                          <option value="Resolved" className="bg-slate-900">Resolved</option>
                          <option value="Ongoing" className="bg-slate-900">Ongoing</option>
                        </select>
                      </div>
                    </div>
                    <button type="submit" disabled={patientLoading} className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition">Save Record</button>
                  </form>
                )}

                {patientLoading ? (
                  <div className="text-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div></div>
                ) : medicalHistory && medicalHistory.length > 0 ? (
                  <div className="space-y-4">
                    {medicalHistory.map((item, idx) => (
                      <div key={idx} className="border border-white/10 rounded-xl p-4 flex justify-between items-center shadow-sm">
                        <div>
                          <h4 className="font-bold text-white text-lg">{item.condition}</h4>
                          <p className="text-sm text-gray-400 mt-1">Diagnosed: <span className="text-gray-300 font-medium">{item.dateDiagnosed}</span></p>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full font-bold border ${item.status === 'Active' ? 'bg-red-500/15 text-red-400 border-red-500/25' : item.status === 'Resolved' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25' : 'bg-blue-500/15 text-blue-400 border-blue-500/25'}`}>
                          {item.status || 'Unknown'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 glass-dark rounded-xl border border-dashed border-white/10">
                    <p className="text-gray-400">No past medical history recorded.</p>
                  </div>
                )}
              </div>
            )}

            {/* LAB REPORTS TAB */}
            {activeTab === 'reports' && (
              <div>
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                  <h2 className="text-2xl font-bold text-white">Lab Reports</h2>
                  <button onClick={() => setShowReportForm(!showReportForm)} className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/20 transition">
                    <FaPlus /> Add Report
                  </button>
                </div>

                {showReportForm && (
                  <form onSubmit={handleAddReport} className="mb-8 p-6 glass-dark rounded-xl border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Test Name</label>
                        <input type="text" required value={reportForm.testName} onChange={e => setReportForm({...reportForm, testName: e.target.value})} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-white transition-all" placeholder="e.g. Complete Blood Count" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                        <input type="date" required value={reportForm.date} onChange={e => setReportForm({...reportForm, date: e.target.value})} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-white transition-all" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-1">Result Summary</label>
                        <textarea required value={reportForm.result} onChange={e => setReportForm({...reportForm, result: e.target.value})} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-white transition-all" rows="2" placeholder="e.g. All parameters within normal limits"></textarea>
                      </div>
                    </div>
                    <button type="submit" disabled={patientLoading} className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition">Save Report</button>
                  </form>
                )}

                {patientLoading ? (
                  <div className="text-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div></div>
                ) : labReports && labReports.length > 0 ? (
                  <div className="space-y-4">
                    {labReports.map((report, idx) => (
                      <div key={idx} className="border border-white/10 rounded-xl p-5 shadow-sm hover:shadow-md transition glass-dark">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-bold text-white text-lg">{report.testName}</h4>
                          <span className="text-sm font-medium text-gray-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full">{report.date}</span>
                        </div>
                        <p className="text-gray-300 text-sm glass-dark p-3 rounded-lg border border-white/10">
                          <span className="font-semibold text-primary block mb-1">Result:</span>
                          {report.result}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 glass-dark rounded-xl border border-dashed border-white/10">
                    <p className="text-gray-400">No recent lab reports available.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
