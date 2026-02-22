import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';

export const scheduleInterview = createAsyncThunk('interviews/schedule', async (interviewData, { rejectWithValue }) => {
  try {
    const { data } = await API.post('/interviews', interviewData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to schedule interview');
  }
});

export const fetchUpcomingInterviews = createAsyncThunk('interviews/fetchUpcoming', async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.get('/interviews/upcoming');
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch interviews');
  }
});

export const fetchCompletedInterviews = createAsyncThunk('interviews/fetchCompleted', async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.get('/interviews/completed');
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch interviews');
  }
});

export const cancelInterview = createAsyncThunk('interviews/cancel', async (id, { rejectWithValue }) => {
  try {
    await API.delete(`/interviews/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to cancel interview');
  }
});

const interviewSlice = createSlice({
  name: 'interviews',
  initialState: {
    upcoming: [],
    completed: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearInterviewStatus: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Schedule
      .addCase(scheduleInterview.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(scheduleInterview.fulfilled, (state, action) => { state.loading = false; state.success = true; state.upcoming.unshift(action.payload); })
      .addCase(scheduleInterview.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // Fetch Upcoming
      .addCase(fetchUpcomingInterviews.pending, (state) => { state.loading = true; })
      .addCase(fetchUpcomingInterviews.fulfilled, (state, action) => { state.loading = false; state.upcoming = action.payload; })
      .addCase(fetchUpcomingInterviews.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // Fetch Completed
      .addCase(fetchCompletedInterviews.pending, (state) => { state.loading = true; })
      .addCase(fetchCompletedInterviews.fulfilled, (state, action) => { state.loading = false; state.completed = action.payload; })
      .addCase(fetchCompletedInterviews.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // Cancel
      .addCase(cancelInterview.fulfilled, (state, action) => { state.upcoming = state.upcoming.filter(i => i._id !== action.payload); });
  },
});

export const { clearInterviewStatus } = interviewSlice.actions;
export default interviewSlice.reducer;