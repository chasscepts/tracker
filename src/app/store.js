import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authSlice';
import tasksReducer from '../reducers/tasksSlice';
import timerReducer from '../reducers/timerSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    timer: timerReducer,
  },
});
