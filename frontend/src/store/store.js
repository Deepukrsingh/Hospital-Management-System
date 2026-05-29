import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import doctorReducer from './slices/doctorSlice';
import appointmentReducer from './slices/appointmentSlice';
import patientReducer from './slices/patientSlice';
import adminReducer from './slices/adminSlice';
import bedReducer from './slices/bedSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctors: doctorReducer,
    appointments: appointmentReducer,
    patient: patientReducer,
    admin: adminReducer,
    beds: bedReducer,
  },
});
