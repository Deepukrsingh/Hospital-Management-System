import React, { useState, useEffect } from 'react';
import { FaUserMd, FaUsers, FaChartLine, FaCog, FaHospital } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllAppointments } from '../../store/slices/appointmentSlice';
const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { appointments, loading } = useSelector((state) => state.appointments);
  const [activeTab, setActiveTab] = useState('overview');
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeTab === 'overview') {
      dispatch(fetchAllAppointments());
    }
  }, [activeTab, dispatch]);

  const adminName = user?.name || "System Admin";
  const totalAppointments = appointments ? appointments.length : 0;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {adminName}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
            <div className="bg-purple-100 text-purple-600 p-4 rounded-full text-2xl">
              <FaHospital />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Appointments</p>
              <h3 className="text-2xl font-bold text-gray-900">{totalAppointments}</h3>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
            <div className="bg-blue-100 text-blue-600 p-4 rounded-full text-2xl">
              <FaUserMd />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Doctors</p>
              <h3 className="text-2xl font-bold text-gray-900">45</h3>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
            <div className="bg-green-100 text-green-600 p-4 rounded-full text-2xl">
              <FaUsers />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Patients</p>
              <h3 className="text-2xl font-bold text-gray-900">3,420</h3>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
            <div className="bg-orange-100 text-orange-600 p-4 rounded-full text-2xl">
              <FaChartLine />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Revenue</p>
              <h3 className="text-2xl font-bold text-gray-900">$42k</h3>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${activeTab === 'overview' ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              <FaChartLine />
              <span className="font-medium">Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('doctors')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${activeTab === 'doctors' ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              <FaUserMd />
              <span className="font-medium">Manage Doctors</span>
            </button>
            <button
              onClick={() => setActiveTab('patients')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${activeTab === 'patients' ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              <FaUsers />
              <span className="font-medium">Manage Patients</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${activeTab === 'settings' ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              <FaCog />
              <span className="font-medium">System Settings</span>
            </button>
          </div>

          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">System Overview</h2>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading overview data...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Appointments</h3>
                    {appointments && appointments.length > 0 ? appointments.slice().reverse().slice(0, 5).map(apt => (
                      <div key={apt._id} className="border rounded-xl p-4 flex justify-between items-center bg-gray-50">
                        <div>
                          <h4 className="font-bold text-gray-900">Patient: {apt.userInfo?.name || 'Unknown'}</h4>
                          <p className="text-sm text-gray-600">Booked Dr. {apt.doctorInfo?.name || 'Unknown'}</p>
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
                    )) : (
                      <p className="text-gray-500">No recent appointments found.</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'doctors' && (
              <div>
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Manage Doctors</h2>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition">
                    Add Doctor
                  </button>
                </div>
                <p className="text-gray-500">Doctor list management goes here.</p>
              </div>
            )}

            {activeTab === 'patients' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Manage Patients</h2>
                <p className="text-gray-500">Patient list management goes here.</p>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">System Settings</h2>
                <p className="text-gray-500">Global application settings.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
