import React, { useState, useEffect } from 'react';
import { FaUser, FaCalendarAlt, FaHistory, FaFileMedical, FaEdit, FaPlus } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyAppointments } from '../../store/slices/appointmentSlice';
import { updateUser } from '../../store/slices/authSlice';
import { fetchPatientRecords, addMedicalHistory, addLabReport } from '../../store/slices/patientSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const PatientDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { appointments, loading: aptLoading } = useSelector((state) => state.appointments);
  const { medicalHistory, labReports, loading: patientLoading, success } = useSelector((state) => state.patient);
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  
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
    }
  }, [success]);

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
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, {userName}!</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${activeTab === 'profile' ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              <FaUser />
              <span className="font-medium">My Profile</span>
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${activeTab === 'appointments' ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              <FaCalendarAlt />
              <span className="font-medium">Appointments</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${activeTab === 'history' ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              <FaHistory />
              <span className="font-medium">Medical History</span>
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${activeTab === 'reports' ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              <FaFileMedical />
              <span className="font-medium">Lab Reports</span>
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            
            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div>
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary outline-none" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input type="text" value={editForm.phone} onChange={(e) => setEditForm({...editForm, phone: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary outline-none" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <textarea value={editForm.address} onChange={(e) => setEditForm({...editForm, address: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary outline-none" rows="3"></textarea>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition">Save Changes</button>
                      <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                      <p className="text-gray-900 font-medium">{userName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                      <p className="text-gray-900 font-medium">{user?.email || "patient@example.com"}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                      <p className="text-gray-900 font-medium">{user?.phone || "Not provided"}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                      <p className="text-gray-900 font-medium">{user?.address || "Not provided"}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* APPOINTMENTS TAB */}
            {activeTab === 'appointments' && (
              <div>
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                  <h2 className="text-2xl font-bold text-gray-900">My Appointments</h2>
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
                      <div key={apt._id} className="border rounded-xl p-4 flex justify-between items-center bg-gray-50">
                        <div>
                          <h4 className="font-bold text-gray-900">Dr. {apt.doctorInfo?.name || 'Unknown'}</h4>
                          <p className="text-sm text-gray-600">{apt.doctorInfo?.specialization || 'Consultation'}</p>
                          <div className="mt-2 text-sm font-medium text-primary">
                            <FaCalendarAlt className="inline mr-1" /> {apt.date}, {apt.time}
                          </div>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                          apt.status === 'approved' ? 'bg-green-100 text-green-800' :
                          apt.status === 'completed' ? 'bg-gray-200 text-gray-800' :
                          apt.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-gray-500">You have no upcoming appointments.</p>
                  </div>
                )}
              </div>
            )}

            {/* MEDICAL HISTORY TAB */}
            {activeTab === 'history' && (
              <div>
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Medical History</h2>
                  <button onClick={() => setShowHistoryForm(!showHistoryForm)} className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/20 transition">
                    <FaPlus /> Add Record
                  </button>
                </div>

                {showHistoryForm && (
                  <form onSubmit={handleAddHistory} className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                        <input type="text" required value={historyForm.condition} onChange={e => setHistoryForm({...historyForm, condition: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary outline-none" placeholder="e.g. Asthma" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date Diagnosed</label>
                        <input type="date" required value={historyForm.dateDiagnosed} onChange={e => setHistoryForm({...historyForm, dateDiagnosed: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select value={historyForm.status} onChange={e => setHistoryForm({...historyForm, status: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary outline-none">
                          <option value="">Select Status</option>
                          <option value="Active">Active</option>
                          <option value="Resolved">Resolved</option>
                          <option value="Ongoing">Ongoing</option>
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
                      <div key={idx} className="border border-gray-100 rounded-xl p-4 flex justify-between items-center shadow-sm">
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">{item.condition}</h4>
                          <p className="text-sm text-gray-500 mt-1">Diagnosed: <span className="text-gray-700 font-medium">{item.dateDiagnosed}</span></p>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full font-bold ${item.status === 'Active' ? 'bg-red-100 text-red-800' : item.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                          {item.status || 'Unknown'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-gray-500">No past medical history recorded.</p>
                  </div>
                )}
              </div>
            )}

            {/* LAB REPORTS TAB */}
            {activeTab === 'reports' && (
              <div>
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Lab Reports</h2>
                  <button onClick={() => setShowReportForm(!showReportForm)} className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/20 transition">
                    <FaPlus /> Add Report
                  </button>
                </div>

                {showReportForm && (
                  <form onSubmit={handleAddReport} className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Test Name</label>
                        <input type="text" required value={reportForm.testName} onChange={e => setReportForm({...reportForm, testName: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary outline-none" placeholder="e.g. Complete Blood Count" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input type="date" required value={reportForm.date} onChange={e => setReportForm({...reportForm, date: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary outline-none" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Result Summary</label>
                        <textarea required value={reportForm.result} onChange={e => setReportForm({...reportForm, result: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary outline-none" rows="2" placeholder="e.g. All parameters within normal limits"></textarea>
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
                      <div key={idx} className="border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-bold text-gray-900 text-lg">{report.testName}</h4>
                          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{report.date}</span>
                        </div>
                        <p className="text-gray-700 text-sm bg-blue-50 p-3 rounded-lg border border-blue-100">
                          <span className="font-semibold text-blue-800 block mb-1">Result:</span>
                          {report.result}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-gray-500">No recent lab reports available.</p>
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
