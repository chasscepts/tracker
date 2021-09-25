import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authSlice';
import tasksReducer from '../reducers/tasksSlice';
import timerReducer from '../reducers/timerSlice';
import detailsReducer from '../reducers/detailsSlice';
import feedbackReducer from '../reducers/feedbackSlice';

export const createStore = () => configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    timer: timerReducer,
    details: detailsReducer,
    feedback: feedbackReducer,
  },
});

const store = createStore();

export default store;
