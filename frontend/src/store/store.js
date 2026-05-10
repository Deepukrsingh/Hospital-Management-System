import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import doctorReducer from './slices/doctorSlice';
import appointmentReducer from './slices/appointmentSlice';
import patientReducer from './slices/patientSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctors: doctorReducer,
    appointments: appointmentReducer,
    patient: patientReducer,
  },
});
