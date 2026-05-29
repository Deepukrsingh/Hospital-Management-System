import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Fetch users by role
export const fetchUsersByRole = createAsyncThunk(
  'admin/fetchUsersByRole',
  async (role, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users?role=${role}`);
      return { role, users: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const fetchDoctorProfiles = createAsyncThunk(
  'admin/fetchDoctorProfiles',
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

export const createDoctorUser = createAsyncThunk(
  'admin/createDoctorUser',
  async (doctorData, { rejectWithValue }) => {
    try {
      const response = await api.post('/users', doctorData);
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

// Delete user by ID
export const deleteUserById = createAsyncThunk(
  'admin/deleteUserById',
  async ({ id, role }, { rejectWithValue }) => {
    try {
      await api.delete(`/users/${id}`);
      return { id, role };
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
  doctorsList: [],
  patientsList: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersByRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersByRole.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.role === 'Doctor') {
          state.doctorsList = action.payload.users;
        } else if (action.payload.role === 'Patient') {
          state.patientsList = action.payload.users;
        }
      })
      .addCase(fetchUsersByRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDoctorProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.doctorsList = action.payload;
      })
      .addCase(fetchDoctorProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createDoctorUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDoctorUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createDoctorUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        if (action.payload.role === 'Doctor') {
          // Check if doctorsList contains doctors or users
          state.doctorsList = state.doctorsList.filter(item => (item.user?._id || item._id) !== action.payload.id);
        } else if (action.payload.role === 'Patient') {
          state.patientsList = state.patientsList.filter(item => (item.user?._id || item._id) !== action.payload.id);
        }
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;
