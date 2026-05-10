import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Fetch all doctors
export const fetchDoctors = createAsyncThunk(
  'doctors/fetchDoctors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/doctors');
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

// Fetch doctor by ID
export const fetchDoctorById = createAsyncThunk(
  'doctors/fetchDoctorById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/doctors/${id}`);
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
  doctors: [],
  doctor: null,
  loading: false,
  error: null,
};

const doctorSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    clearDoctorError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all doctors
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch doctor by ID
      .addCase(fetchDoctorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        state.loading = false;
        state.doctor = action.payload;
      })
      .addCase(fetchDoctorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDoctorError } = doctorSlice.actions;
export default doctorSlice.reducer;
