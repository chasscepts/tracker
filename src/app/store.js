import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authSlice';
import tasksReducer from '../reducers/tasksSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
});
