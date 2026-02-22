import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';

export const fetchReadiness = createAsyncThunk('readiness/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.get('/readiness');
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch readiness score');
  }
});

const readinessSlice = createSlice({
  name: 'readiness',
  initialState: {
    readiness: {},
    overallReadiness: 0,
    label: '',
    recommendation: '',
    totalInterviews: 0,
    history: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReadiness.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchReadiness.fulfilled, (state, action) => {
        state.loading = false;
        state.readiness = action.payload.readiness;
        state.overallReadiness = action.payload.overallReadiness;
        state.label = action.payload.label;
        state.recommendation = action.payload.recommendation;
        state.totalInterviews = action.payload.totalInterviews;
        state.history = action.payload.history;
      })
      .addCase(fetchReadiness.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default readinessSlice.reducer;