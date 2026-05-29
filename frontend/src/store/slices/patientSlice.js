import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchPatientRecords = createAsyncThunk(
  'patient/fetchRecords',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/patient/records');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const addMedicalHistory = createAsyncThunk(
  'patient/addHistory',
  async (recordData, { rejectWithValue }) => {
    try {
      const response = await api.post('/patient/history', recordData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const addLabReport = createAsyncThunk(
  'patient/addReport',
  async (reportData, { rejectWithValue }) => {
    try {
      const response = await api.post('/patient/reports', reportData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const fetchPatientRecordsById = createAsyncThunk(
  'patient/fetchRecordsById',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/patient/${userId}/records`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const initialState = {
  medicalHistory: [],
  labReports: [],
  viewedPatientRecords: null,
  loading: false,
  error: null,
  success: false
};

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    clearPatientError: (state) => {
      state.error = null;
    },
    clearPatientSuccess: (state) => {
      state.success = false;
    },
    clearViewedPatientRecords: (state) => {
      state.viewedPatientRecords = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Records
      .addCase(fetchPatientRecords.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPatientRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.medicalHistory = action.payload.medicalHistory;
        state.labReports = action.payload.labReports;
      })
      .addCase(fetchPatientRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Records By Id (for Doctor)
      .addCase(fetchPatientRecordsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPatientRecordsById.fulfilled, (state, action) => {
        state.loading = false;
        state.viewedPatientRecords = action.payload;
      })
      .addCase(fetchPatientRecordsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add History
      .addCase(addMedicalHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMedicalHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.medicalHistory = action.payload;
      })
      .addCase(addMedicalHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Report
      .addCase(addLabReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(addLabReport.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.labReports = action.payload;
      })
      .addCase(addLabReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPatientError, clearPatientSuccess, clearViewedPatientRecords } = patientSlice.actions;
export default patientSlice.reducer;
