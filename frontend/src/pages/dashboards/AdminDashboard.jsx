import React, { useState, useEffect } from 'react';
import { FaUserMd, FaUsers, FaChartLine, FaCog, FaHospital, FaPlus, FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllAppointments, updateAppointmentStatus } from '../../store/slices/appointmentSlice';
import { fetchUsersByRole, fetchDoctorProfiles, createDoctorUser, deleteUserById } from '../../store/slices/adminSlice';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { appointments, loading: aptLoading } = useSelector((state) => state.appointments);
  const { doctorsList, patientsList, loading: adminLoading } = useSelector((state) => state.admin);
  
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddDoctorForm, setShowAddDoctorForm] = useState(false);
  const location = useLocation();
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    email: '',
    password: '',
    specialization: 'General Practice',
    experience: '3',
    feesPerCunsultation: '150',
    timings: '09:00 AM,11:00 AM,02:00 PM',
    qualifications: '',
    designation: '',
    department: '',
    about: '',
    education: '',
    experienceList: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (activeTab === 'overview') {
      dispatch(fetchAllAppointments());
    } else if (activeTab === 'doctors') {
      dispatch(fetchDoctorProfiles());
    } else if (activeTab === 'patients') {
      dispatch(fetchUsersByRole('Patient'));
    }
  }, [activeTab, dispatch]);

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  const adminName = user?.name || "System Admin";
  const totalAppointments = appointments ? appointments.length : 0;

  const handleNewDoctorChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateDoctor = async (e) => {
    e.preventDefault();
    const timingsArray = newDoctor.timings.split(',').map((slot) => slot.trim()).filter(Boolean);
    const qualificationsArray = newDoctor.qualifications.split(',').map((q) => q.trim()).filter(Boolean);
    const educationArray = newDoctor.education.split('\n').map((line) => line.trim()).filter(Boolean);
    const experienceListArray = newDoctor.experienceList.split('\n').map((line) => line.trim()).filter(Boolean);

    if (!newDoctor.name || !newDoctor.email || !newDoctor.password) {
      toast.error('Name, email and password are required');
      return;
    }

    const doctorPayload = {
      name: newDoctor.name,
      email: newDoctor.email,
      password: newDoctor.password,
      specialization: newDoctor.specialization,
      experience: Number(newDoctor.experience),
      feesPerCunsultation: Number(newDoctor.feesPerCunsultation),
      timings: timingsArray,
      role: 'Doctor',
      qualifications: qualificationsArray,
      designation: newDoctor.designation,
      department: newDoctor.department,
      about: newDoctor.about,
      education: educationArray,
      experienceList: experienceListArray,
    };

    const resultAction = await dispatch(createDoctorUser(doctorPayload));

    if (createDoctorUser.fulfilled.match(resultAction)) {
      toast.success('Doctor added successfully');
      setShowAddDoctorForm(false);
      setNewDoctor({
        name: '',
        email: '',
        password: '',
        specialization: 'General Practice',
        experience: '3',
        feesPerCunsultation: '150',
        timings: '09:00 AM,11:00 AM,02:00 PM',
        qualifications: '',
        designation: '',
        department: '',
        about: '',
        education: '',
        experienceList: '',
      });
      dispatch(fetchDoctorProfiles());
    } else {
      toast.error(resultAction.payload || 'Unable to add doctor');
    }
  };

  const handleDelete = async (userId, userName, role) => {
    if (!userId) {
      toast.error('Invalid user ID');
      return;
    }
    if (window.confirm(`Are you sure you want to completely remove ${userName} from the system? This action cannot be undone.`)) {
      const resultAction = await dispatch(deleteUserById({ id: userId, role }));
      if (deleteUserById.fulfilled.match(resultAction)) {
        toast.success(`${userName} has been removed successfully.`);
      } else {
        toast.error(resultAction.payload || `Failed to remove ${userName}.`);
      }
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await dispatch(updateAppointmentStatus({ id, status })).unwrap();
      toast.success(`Appointment marked as ${status}`);
    } catch (err) {
      toast.error(err || 'Failed to update status');
    }
  };

  // Handlers

  return (
    <div className="min-h-screen text-white py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400 mt-2">Welcome back, {adminName}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-dark rounded-xl shadow-sm border border-white/10 p-6 flex items-center space-x-4">
            <div className="bg-primary/10 text-primary border border-primary/20 p-4 rounded-full text-2xl">
              <FaHospital />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Appointments</p>
              <h3 className="text-2xl font-bold text-white">{totalAppointments}</h3>
            </div>
          </div>
          <div className="glass-dark rounded-xl shadow-sm border border-white/10 p-6 flex items-center space-x-4">
            <div className="bg-blue-500/10 text-blue-400 border border-blue-500/20 p-4 rounded-full text-2xl">
              <FaUserMd />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Doctors</p>
              <h3 className="text-2xl font-bold text-white">45</h3>
            </div>
          </div>
          <div className="glass-dark rounded-xl shadow-sm border border-white/10 p-6 flex items-center space-x-4">
            <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 p-4 rounded-full text-2xl">
              <FaUsers />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Patients</p>
              <h3 className="text-2xl font-bold text-white">3,420</h3>
            </div>
          </div>
          <div className="glass-dark rounded-xl shadow-sm border border-white/10 p-6 flex items-center space-x-4">
            <div className="bg-amber-500/10 text-amber-400 border border-amber-500/20 p-4 rounded-full text-2xl">
              <FaChartLine />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Revenue</p>
              <h3 className="text-2xl font-bold text-white">₹42k</h3>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'overview' ? 'bg-primary text-white shadow-md' : 'glass-dark text-gray-300 hover:bg-white/5 hover:text-white hover:border-white/10'}`}
            >
              <FaChartLine />
              <span className="font-medium">Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('doctors')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'doctors' ? 'bg-primary text-white shadow-md' : 'glass-dark text-gray-300 hover:bg-white/5 hover:text-white hover:border-white/10'}`}
            >
              <FaUserMd />
              <span className="font-medium">Manage Doctors</span>
            </button>
            <button
              onClick={() => setActiveTab('patients')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'patients' ? 'bg-primary text-white shadow-md' : 'glass-dark text-gray-300 hover:bg-white/5 hover:text-white hover:border-white/10'}`}
            >
              <FaUsers />
              <span className="font-medium">Manage Patients</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'settings' ? 'bg-primary text-white shadow-md' : 'glass-dark text-gray-300 hover:bg-white/5 hover:text-white hover:border-white/10'}`}
            >
              <FaCog />
              <span className="font-medium">System Settings</span>
            </button>
          </div>

          <div className="flex-1 glass-dark rounded-2xl shadow-sm border border-white/10 p-8">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 border-b pb-4">System Overview</h2>
                {aptLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-400">Loading overview data...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-300 mb-4">Recent Appointments</h3>
                    {appointments && appointments.length > 0 ? appointments.slice().reverse().slice(0, 5).map(apt => (
                      <div key={apt._id} className="border rounded-xl p-4 flex justify-between items-center glass-dark">
                        <div>
                          <h4 className="font-bold text-white">Patient: {apt.userInfo?.name || 'Unknown'}</h4>
                          <p className="text-sm text-gray-400">Booked Dr. {apt.doctorInfo?.name || 'Unknown'}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              apt.appointmentType === 'Online' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'
                            }`}>
                              {apt.appointmentType || 'OPD'}
                            </span>
                            <span className="text-gray-400 text-xs font-semibold">Fee: ₹{apt.fees || 0}</span>
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
                          {apt.status === 'approved' && (
                            <button 
                              onClick={() => handleStatusUpdate(apt._id, 'completed')}
                              className="bg-blue-500/15 text-blue-400 border border-blue-500/25 px-3 py-1 rounded-md text-sm font-bold hover:bg-blue-500/25 transition"
                            >
                              Mark Completed
                            </button>
                          )}
                        </div>
                      </div>
                    )) : (
                      <p className="text-gray-400">No recent appointments found.</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'doctors' && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4 gap-4">
                  <h2 className="text-2xl font-bold text-white">Manage Doctors</h2>
                  <button
                    onClick={() => setShowAddDoctorForm((prev) => !prev)}
                    className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition"
                  >
                    {showAddDoctorForm ? 'Close Form' : 'Add Doctor'}
                  </button>
                </div>
                {showAddDoctorForm && (
                  <form onSubmit={handleCreateDoctor} className="mb-6 space-y-4 p-4 rounded-2xl glass-dark border border-white/10">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={newDoctor.name}
                          onChange={handleNewDoctorChange}
                          className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 text-white transition-all"
                          placeholder="Dr. Priya Sharma"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={newDoctor.email}
                          onChange={handleNewDoctorChange}
                          className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 text-white transition-all"
                          placeholder="doctor@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                        <input
                          type="password"
                          name="password"
                          value={newDoctor.password}
                          onChange={handleNewDoctorChange}
                          className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 text-white transition-all"
                          placeholder="Choose a secure password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Specialization</label>
                        <input
                          type="text"
                          name="specialization"
                          value={newDoctor.specialization}
                          onChange={handleNewDoctorChange}
                          className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 text-white transition-all"
                          placeholder="Cardiology"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Experience (years)</label>
                        <input
                          type="number"
                          min="0"
                          name="experience"
                          value={newDoctor.experience}
                          onChange={handleNewDoctorChange}
                          className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 text-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Consultation Fee</label>
                        <input
                          type="number"
                          min="0"
                          name="feesPerCunsultation"
                          value={newDoctor.feesPerCunsultation}
                          onChange={handleNewDoctorChange}
                          className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 text-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Timings</label>
                        <input
                          type="text"
                          name="timings"
                          value={newDoctor.timings}
                          onChange={handleNewDoctorChange}
                          className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 text-white transition-all"
                          placeholder="09:00 AM,11:00 AM,02:00 PM"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Qualifications</label>
                        <input
                          type="text"
                          name="qualifications"
                          value={newDoctor.qualifications}
                          onChange={handleNewDoctorChange}
                          className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 text-white transition-all"
                          placeholder="MD(Anaesthesiology), Reg. No.-19519"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Designation</label>
                        <input
                          type="text"
                          name="designation"
                          value={newDoctor.designation}
                          onChange={handleNewDoctorChange}
                          className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 text-white transition-all"
                          placeholder="Group Medical Director"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Department / Institute</label>
                        <input
                          type="text"
                          name="department"
                          value={newDoctor.department}
                          onChange={handleNewDoctorChange}
                          className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 text-white transition-all"
                          placeholder="Chandan Institute of Critical Care"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">About Bio</label>
                      <textarea
                        name="about"
                        rows="3"
                        value={newDoctor.about}
                        onChange={handleNewDoctorChange}
                        className="w-full rounded-xl border border-white/10 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-900 text-white"
                        placeholder="Dr. Farrukh Ansari is a well-known anaesthesiologist..."
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Education (One item per line)</label>
                        <textarea
                          name="education"
                          rows="4"
                          value={newDoctor.education}
                          onChange={handleNewDoctorChange}
                          className="w-full rounded-xl border border-white/10 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-900 text-white"
                          placeholder="MBBS, JN Medical College, AMU, Aligarh (1992 - 1997)&#10;MD Anaesthesiology, JN Medical College (1999 - 2002)"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Experience Details (One milestone per line)</label>
                        <textarea
                          name="experienceList"
                          rows="4"
                          value={newDoctor.experienceList}
                          onChange={handleNewDoctorChange}
                          className="w-full rounded-xl border border-white/10 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-900 text-white"
                          placeholder="Senior Resident, Department of Anaesthesiology, JN Medical College (2002 - 2003)&#10;Associate Consultant, Sahara Hospital (2011 - 2014)"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-primary text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-primary-dark transition"
                      >
                        Create Doctor
                      </button>
                    </div>
                  </form>
                )}
                {adminLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="glass-dark text-gray-400 text-sm border-b">
                          <th className="p-4 font-semibold rounded-tl-xl">Name</th>
                          <th className="p-4 font-semibold">Email</th>
                          <th className="p-4 font-semibold">Specialization</th>
                          <th className="p-4 font-semibold">Status</th>
                          <th className="p-4 font-semibold">Joined</th>
                          <th className="p-4 font-semibold rounded-tr-xl">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {doctorsList.length > 0 ? doctorsList.map(doc => (
                          <tr key={doc._id} className="border-b hover:glass-dark transition">
                            <td className="p-4 font-medium text-white">{doc.user?.name || 'Unknown'}</td>
                            <td className="p-4 text-gray-400">{doc.user?.email || '-'}</td>
                            <td className="p-4 text-gray-300">{doc.specialization || 'General Practice'}</td>
                            <td className="p-4">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${doc.status === 'approved' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25' : doc.status === 'rejected' ? 'bg-red-500/15 text-red-400 border-red-500/25' : 'bg-amber-500/15 text-amber-400 border-amber-500/25'}`}>
                                {doc.status?.charAt(0).toUpperCase() + doc.status?.slice(1)}
                              </span>
                            </td>
                            <td className="p-4 text-gray-400">{new Date(doc.createdAt).toLocaleDateString()}</td>
                            <td className="p-4">
                              <button 
                                onClick={() => handleDelete(doc.user?._id, doc.user?.name, 'Doctor')} 
                                className="text-red-500 hover:text-red-700 font-bold text-sm glass-dark px-3 py-1 rounded-lg transition-colors"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        )) : (
                          <tr><td colSpan="6" className="p-4 text-center text-gray-400">No doctors found.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'patients' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 border-b pb-4">Manage Patients</h2>
                {adminLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="glass-dark text-gray-400 text-sm border-b">
                          <th className="p-4 font-semibold rounded-tl-xl">Name</th>
                          <th className="p-4 font-semibold">Email</th>
                          <th className="p-4 font-semibold">Joined</th>
                          <th className="p-4 font-semibold rounded-tr-xl">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {patientsList.length > 0 ? patientsList.map(pat => (
                          <tr key={pat._id} className="border-b hover:glass-dark transition">
                            <td className="p-4 font-medium text-white">{pat.name}</td>
                            <td className="p-4 text-gray-400">{pat.email}</td>
                            <td className="p-4 text-gray-400">{new Date(pat.createdAt).toLocaleDateString()}</td>
                            <td className="p-4">
                              <button 
                                onClick={() => handleDelete(pat._id, pat.name, 'Patient')} 
                                className="text-red-500 hover:text-red-700 font-bold text-sm glass-dark px-3 py-1 rounded-lg transition-colors"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        )) : (
                          <tr><td colSpan="4" className="p-4 text-center text-gray-400">No patients found.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 border-b pb-4">System Settings</h2>
                <p className="text-gray-400">Global application settings.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
