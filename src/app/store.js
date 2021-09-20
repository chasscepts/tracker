import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authSlice';
import tasksReducer from '../reducers/tasksSlice';
import timerReducer from '../reducers/timerSlice';
import detailsReducer from '../reducers/detailsSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    timer: timerReducer,
    details: detailsReducer,
  },
});
