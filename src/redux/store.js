import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import interviewReducer from './slices/interviewSlice';
import practiceReducer from './slices/practiceSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    interviews: interviewReducer,
    practice: practiceReducer,
  },
});

export default store;