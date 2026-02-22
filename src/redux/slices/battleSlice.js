import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';

export const createBattle = createAsyncThunk('battle/create', async (category, { rejectWithValue }) => {
  try {
    const { data } = await API.post('/battle/create', { category });
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create battle');
  }
});

export const fetchOpenBattles = createAsyncThunk('battle/fetchOpen', async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.get('/battle/open');
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch battles');
  }
});

export const joinBattle = createAsyncThunk('battle/join', async (id, { rejectWithValue }) => {
  try {
    const { data } = await API.post(`/battle/join/${id}`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to join battle');
  }
});

export const submitAnswer = createAsyncThunk('battle/submit', async ({ id, answer }, { rejectWithValue }) => {
  try {
    const { data } = await API.post(`/battle/submit/${id}`, { answer });
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to submit answer');
  }
});

export const fetchMyBattles = createAsyncThunk('battle/fetchMy', async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.get('/battle/my');
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch my battles');
  }
});

export const fetchLeaderboard = createAsyncThunk('battle/leaderboard', async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.get('/battle/leaderboard');
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch leaderboard');
  }
});

const battleSlice = createSlice({
  name: 'battle',
  initialState: {
    currentBattle: null,
    openBattles: [],
    myBattles: [],
    leaderboard: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearBattleStatus: (state) => {
      state.error = null;
      state.success = false;
    },
    clearCurrentBattle: (state) => {
      state.currentBattle = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBattle.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createBattle.fulfilled, (state, action) => { state.loading = false; state.currentBattle = action.payload; state.success = true; })
      .addCase(createBattle.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchOpenBattles.fulfilled, (state, action) => { state.openBattles = action.payload; })
      .addCase(joinBattle.fulfilled, (state, action) => { state.currentBattle = action.payload; state.success = true; })
      .addCase(joinBattle.rejected, (state, action) => { state.error = action.payload; })
      .addCase(submitAnswer.fulfilled, (state, action) => { state.currentBattle = action.payload; })
      .addCase(fetchMyBattles.fulfilled, (state, action) => { state.myBattles = action.payload; })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => { state.leaderboard = action.payload; });
  },
});

export const { clearBattleStatus, clearCurrentBattle } = battleSlice.actions;
export default battleSlice.reducer;