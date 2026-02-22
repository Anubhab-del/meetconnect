import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import interviewReducer from './slices/interviewSlice';
import practiceReducer from './slices/practiceSlice';
import readinessReducer from './slices/readinessSlice';
import battleReducer from './slices/battleSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    interviews: interviewReducer,
    practice: practiceReducer,
    readiness: readinessReducer,
    battle: battleReducer,
  },
});

export default store;