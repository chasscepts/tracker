import { createSlice } from '@reduxjs/toolkit';
import api from '../api';

/* eslint-disable no-param-reassign */
const detailsSlice = createSlice({
  name: 'details',
  initialState: {
    requestCount: 0,
    hasPendingRequest: false,
    store: [],
    group: null,
    loadError: null,
  },
  reducers: {
    addRequest: (state) => {
      state.requestCount += 1;
      state.hasPendingRequest = true;
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
    setGroupLoadError: (state, { payload }) => {
      state.loadError = payload;
    },
  },
});
/* eslint-enable no-param-reassign */

export const {
  addRequest,
  addGroup,
  setGroup,
  setGroupLoadError,
} = detailsSlice.actions;

export const selectDetailsHasPendingError = (state) => state.details.hasPendingRequest;
export const selectDetailsGroup = (state) => state.details.group;
export const selectDetailsLoadError = (state) => state.details.loadError;

export const loadGroupTasks = (groupId, title) => (dispatch, getState) => {
  const { auth: { user }, details: { store } } = getState();
  if (!user) {
    dispatch(setGroupLoadError('You must be logged in to fetch tasks'));
    return;
  }

  const group = store.find((g) => g.id === groupId);
  if (group) {
    dispatch(setGroup(group));
    return;
  }

  dispatch(addRequest());

  api.getGroupTasks(user.token, groupId)
    .then((group) => {
      dispatch(addGroup({ title, id: groupId, tasks: group }));
    })
    .catch((err) => setGroupLoadError(err.message));
};

export default detailsSlice.reducer;
