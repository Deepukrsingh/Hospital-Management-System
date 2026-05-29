import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchBeds = createAsyncThunk(
  'beds/fetchBeds',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/beds');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addBed = createAsyncThunk(
  'beds/addBed',
  async (bedData, { rejectWithValue }) => {
    try {
      const response = await api.post('/beds', bedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const allocateBed = createAsyncThunk(
  'beds/allocateBed',
  async ({ id, patientId }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/beds/${id}/allocate`, { patientId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const dischargeBed = createAsyncThunk(
  'beds/dischargeBed',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.put(`/beds/${id}/discharge`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateBedStatus = createAsyncThunk(
  'beds/updateBedStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/beds/${id}/status`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const bedSlice = createSlice({
  name: 'beds',
  initialState: {
    bedsList: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearBedError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBeds.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBeds.fulfilled, (state, action) => {
        state.loading = false;
        state.bedsList = action.payload;
      })
      .addCase(fetchBeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addBed.fulfilled, (state, action) => {
        state.bedsList.push(action.payload);
      })
      .addCase(allocateBed.fulfilled, (state, action) => {
        const index = state.bedsList.findIndex(bed => bed._id === action.payload._id);
        if (index !== -1) {
          state.bedsList[index] = action.payload;
        }
      })
      .addCase(dischargeBed.fulfilled, (state, action) => {
        const index = state.bedsList.findIndex(bed => bed._id === action.payload._id);
        if (index !== -1) {
          state.bedsList[index] = action.payload;
        }
      })
      .addCase(updateBedStatus.fulfilled, (state, action) => {
        const index = state.bedsList.findIndex(bed => bed._id === action.payload._id);
        if (index !== -1) {
          state.bedsList[index] = action.payload;
        }
      });
  }
});

export const { clearBedError } = bedSlice.actions;
export default bedSlice.reducer;
