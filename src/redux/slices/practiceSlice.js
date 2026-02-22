import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';

export const fetchQuestions = createAsyncThunk('practice/fetchQuestions', async ({ category, page }, { rejectWithValue }) => {
  try {
    const { data } = await API.get(`/practice/questions?category=${category}&page=${page}&limit=10`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch questions');
  }
});

export const fetchBlogs = createAsyncThunk('practice/fetchBlogs', async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.get('/practice/blogs');
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch blogs');
  }
});

const practiceSlice = createSlice({
  name: 'practice',
  initialState: {
    questions: [],
    blogs: [],
    totalPages: 1,
    currentPage: 1,
    totalQuestions: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload.questions;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalQuestions = action.payload.totalQuestions;
      })
      .addCase(fetchQuestions.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchBlogs.fulfilled, (state, action) => { state.blogs = action.payload; });
  },
});

export default practiceSlice.reducer;