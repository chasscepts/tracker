import { createSlice } from '@reduxjs/toolkit';
import api from '../api';
import { setTasksError } from './tasksSlice';

/* eslint-disable no-param-reassign */
const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    entry: {},
    nextEntry: {},
    updateError: null,
    updateSuccess: null,
    pendingRequestCount: 0,
    hasPendingRequests: false,
  },
  reducers: {
    commitNext: (state) => {
      state.entry = state.nextEntry;
      state.nextEntry = null;
    },
    setEntry: (state, { payload }) => {
      state.entry = payload;
    },
    setNextEntry: (state, { payload }) => {
      if (!state.entry.id) {
        state.entry = payload;
      } else {
        state.nextEntry = payload;
      }
    },
    addEntryRequest: (state) => {
      state.pendingRequestCount += 1;
      state.hasPendingRequests = true;
      state.updateError = null;
      state.updateSuccess = null;
    },
    updateStoreEntry: (state, { payload: { message, duration } }) => {
      console.log({ message, duration });
      state.updateSuccess = message;
      state.entry.entry.duration += duration;
      console.log(state.entry.entry.duration);
      let temp = state.pendingRequestCount - 1;
      if (temp <= 0) {
        state.hasPendingRequests = false;
        temp = 0;
      }
      state.pendingRequestCount = temp;
    },
    setEntryUpdateSuccess: (state, { payload }) => {
      state.updateSuccess = payload;
      let temp = state.pendingRequestCount - 1;
      if (temp <= 0) {
        state.hasPendingRequests = false;
        temp = 0;
      }
      state.pendingRequestCount = temp;
    },
    setEntryUpdateError: (state, { payload }) => {
      state.updateError = payload;
      let temp = state.pendingRequestCount - 1;
      if (temp <= 0) {
        state.hasPendingRequests = false;
        temp = 0;
      }
      state.pendingRequestCount = temp;
    },
  },
});
/* eslint-enable no-param-reassign */

export const {
  commitNext,
  setEntry,
  setNextEntry,
  addEntryRequest,
  updateStoreEntry,
  setEntryUpdateSuccess,
  setEntryUpdateError,
} = timerSlice.actions;

export const selectEntry = (state) => state.timer.entry;
export const selectNextEntry = (state) => state.timer.nextEntry;
export const selectEntryUpdateError = (state) => state.timer.updateError;
export const selectEntryUpdateSuccess = (state) => state.timer.updateSuccess;
export const selectEntryHasPendingRequest = (state) => state.timer.hasPendingRequests;
export const selectEntryPendingRequestCount = (state) => state.timer.pendingRequestCount;

export default timerSlice.reducer;

export const updateEntry = (entry, duration, title) => (dispatch, getState) => {
  const { auth: { user } } = getState();

  if (!user) {
    dispatch(setTasksError('You must be logged in to fetch tasks'));
    return;
  }

  dispatch(addEntryRequest());

  api.updateEntry(user.token, entry, duration)
    .then(() => {
      const msg = `Update of Task Entry ${title} successful`;
      dispatch(updateStoreEntry({ message: msg, duration }));
    })
    .catch(({ message }) => {
      const msg = `Update of Task Entry ${title} failed with message: ${message}`;
      dispatch(setEntryUpdateError(msg));
    });
};
