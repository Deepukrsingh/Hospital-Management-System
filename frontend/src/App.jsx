import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Doctors from './pages/Doctors';
import Services from './pages/Services';
import SymptomChecker from './pages/SymptomChecker';
import ProtectedRoute from './components/routing/ProtectedRoute';
import PatientDashboard from './pages/dashboards/PatientDashboard';
import DoctorDashboard from './pages/dashboards/DoctorDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import { useDispatch } from 'react-redux';
import { loadUser } from './store/slices/authSlice';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/services" element={<Services />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            <Route 
              path="/dashboard/patient" 
              element={
                <ProtectedRoute allowedRoles={['Patient']}>
                  <PatientDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/doctor" 
              element={
                <ProtectedRoute allowedRoles={['Doctor']}>
                  <DoctorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/admin" 
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            {/* Other routes will be added here */}
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
