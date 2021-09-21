import { createSlice } from '@reduxjs/toolkit';
import api from '../api';
import { addFeedback } from './feedbackSlice';
import { updateTaskEntry } from './tasksSlice';

/* eslint-disable no-param-reassign */
const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    entry: {},
    nextEntry: {},
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
      if (!state.entry.entry) {
        state.entry = payload;
      } else {
        state.nextEntry = payload;
      }
    },
    addEntryRequest: (state) => {
      state.pendingRequestCount += 1;
      state.hasPendingRequests = true;
    },
    removeEntryRequest: (state) => {
      let temp = state.pendingRequestCount;
      if (temp > 0) {
        temp -= 1;
        if (temp === 0) {
          state.hasPendingRequests = false;
        }
        state.pendingRequestCount = temp;
      }
    },
    updateStoreEntry: (state, { payload }) => {
      const { entry: { entry } } = state;
      if (entry && entry.id === payload.id) {
        entry.duration += payload.duration;
      }

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
  removeEntryRequest,
} = timerSlice.actions;

export const selectEntry = (state) => state.timer.entry;
export const selectNextEntry = (state) => state.timer.nextEntry;
export const selectEntryHasPendingRequest = (state) => state.timer.hasPendingRequests;
export const selectEntryPendingRequestCount = (state) => state.timer.pendingRequestCount;

export default timerSlice.reducer;

export const updateEntry = (entry, duration, title) => (dispatch, getState) => {
  const { auth: { user } } = getState();

  if (!user) {
    dispatch(addFeedback({ message: 'You must be logged in to fetch groups', type: 'error' }));
    return;
  }

  dispatch(addEntryRequest());

  api.updateEntry(user.token, entry, duration)
    .then(() => {
      const msg = `Update of Task Entry ${title} successful`;
      dispatch(updateStoreEntry({ duration, id: entry.id }));
      dispatch(removeEntryRequest());
      dispatch(updateTaskEntry({ entry, duration }));
      dispatch(addFeedback({ type: 'success', message: msg }));
    })
    .catch(({ message }) => {
      const msg = `Update of Task Entry ${title} failed with message: ${message}`;
      dispatch(removeEntryRequest());
      dispatch(addFeedback({ type: 'error', message: msg }));
    });
};
