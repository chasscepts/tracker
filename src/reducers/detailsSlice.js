import { createSlice } from '@reduxjs/toolkit';
import { fetchGroupTasks } from '../api';
import { addFeedback } from './feedbackSlice';

/* eslint-disable no-param-reassign */
const detailsSlice = createSlice({
  name: 'details',
  initialState: {
    requestCount: 0,
    hasPendingRequest: false,
    store: [],
    group: null,
  },
  reducers: {
    addRequest: (state) => {
      state.requestCount += 1;
      state.hasPendingRequest = true;
    },
    removeRequest: (state) => {
      let temp = state.requestCount - 1;
      if (temp < 0) {
        temp = 0;
        state.hasPendingRequest = false;
      }
      state.requestCount = temp;
    },
    addGroup: (state, { payload }) => {
      state.group = payload;
      state.store.push(payload);
      let temp = state.requestCount - 1;
      if (temp < 0) {
        temp = 0;
        state.hasPendingRequest = false;
      }
      state.requestCount = temp;
    },
    setGroup: (state, { payload }) => {
      state.group = payload;
      let temp = state.requestCount - 1;
      if (temp < 0) {
        temp = 0;
        state.hasPendingRequest = false;
      }
      state.requestCount = temp;
    },
  },
});
/* eslint-enable no-param-reassign */

export const {
  addRequest,
  removeRequest,
  addGroup,
  setGroup,
} = detailsSlice.actions;

export const selectDetailsHasPendingError = (state) => state.details.hasPendingRequest;
export const selectDetailsGroup = (state) => state.details.group;

export const loadGroupTasks = (groupId, title) => (dispatch, getState) => {
  const { auth: { user }, details: { store } } = getState();
  if (!user) {
    dispatch(addFeedback({ message: 'You must be logged in to fetch tasks', type: 'error' }));
    return;
  }

  const group = store.find((g) => g.id === groupId);
  if (group) {
    dispatch(setGroup(group));
    return;
  }

  dispatch(addRequest());

  fetchGroupTasks(user.token, groupId)
    .then((group) => {
      dispatch(addGroup({ title, id: groupId, tasks: group }));
    })
    .catch(({ message }) => {
      dispatch(removeRequest());
      dispatch(addFeedback({ message, type: 'error' }));
    });
};

export default detailsSlice.reducer;
