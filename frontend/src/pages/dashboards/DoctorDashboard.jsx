import React, { useState, useEffect } from 'react';
import { FaUserMd, FaCalendarCheck, FaClock, FaUsers } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyAppointments, updateAppointmentStatus } from '../../store/slices/appointmentSlice';
import { toast } from 'react-toastify';
const DoctorDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { appointments, loading } = useSelector((state) => state.appointments);
  const [activeTab, setActiveTab] = useState('appointments');
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeTab === 'appointments') {
      dispatch(fetchMyAppointments());
    }
  }, [activeTab, dispatch]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await dispatch(updateAppointmentStatus({ id, status })).unwrap();
      toast.success(`Appointment marked as ${status}`);
    } catch (err) {
      toast.error(err || 'Failed to update status');
    }
  };

  const doctorName = user?.name || "Dr. Smith";
  const pendingAppointmentsCount = appointments ? appointments.filter(a => a.status === 'pending').length : 0;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {doctorName}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
            <div className="bg-blue-100 text-blue-600 p-4 rounded-full text-2xl">
              <FaCalendarCheck />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Pending Appointments</p>
              <h3 className="text-2xl font-bold text-gray-900">{pendingAppointmentsCount}</h3>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
            <div className="bg-green-100 text-green-600 p-4 rounded-full text-2xl">
              <FaUsers />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Patients</p>
              <h3 className="text-2xl font-bold text-gray-900">240</h3>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 space-y-2">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${activeTab === 'appointments' ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              <FaCalendarCheck />
              <span className="font-medium">Appointments</span>
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${activeTab === 'schedule' ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              <FaClock />
              <span className="font-medium">My Schedule</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${activeTab === 'profile' ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              <FaUserMd />
              <span className="font-medium">My Profile</span>
            </button>
          </div>

          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            {activeTab === 'appointments' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Patient Appointments</h2>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading appointments...</p>
                  </div>
                ) : appointments && appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((apt) => (
                      <div key={apt._id} className="border rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 gap-4">
                        <div>
                          <h4 className="font-bold text-gray-900">{apt.userInfo?.name || 'Patient'}</h4>
                          <p className="text-sm text-gray-600">{apt.userInfo?.email || 'No email provided'}</p>
                          <div className="mt-2 text-sm font-medium text-primary">
                            <FaCalendarCheck className="inline mr-1" /> {apt.date}, {apt.time}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                            apt.status === 'approved' ? 'bg-green-100 text-green-800' :
                            apt.status === 'completed' ? 'bg-gray-200 text-gray-800' :
                            apt.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                          </span>
                          
                          {apt.status === 'pending' && (
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleStatusUpdate(apt._id, 'approved')}
                                className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm font-bold hover:bg-green-200 transition"
                              >
                                Approve
                              </button>
                              <button 
                                onClick={() => handleStatusUpdate(apt._id, 'rejected')}
                                className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-sm font-bold hover:bg-red-200 transition"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                          {apt.status === 'approved' && (
                            <button 
                              onClick={() => handleStatusUpdate(apt._id, 'completed')}
                              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm font-bold hover:bg-blue-200 transition"
                            >
                              Mark Completed
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-gray-500">You have no appointments.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'schedule' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Manage Availability</h2>
                <p className="text-gray-500">Feature coming soon.</p>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Doctor Profile</h2>
                <p className="text-gray-500">Feature coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
