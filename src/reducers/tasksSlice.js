import { createSlice } from '@reduxjs/toolkit';
import api from '../api';

/* eslint-disable no-param-reassign */
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    groups: null,
    tasks: null,
    groupsLoading: false,
    tasksLoading: false,
    groupsError: null,
    tasksError: null,
  },
  reducers: {
    setGroups: (state, { payload }) => {
      state.groups = payload;
      state.groupsLoading = false;
      if (payload) {
        state.groupsError = null;
      }
    },
    setGroupsLoading: (state, { payload }) => {
      state.groupsLoading = payload;
    },
    setGroupsError: (state, { payload }) => {
      state.groupsError = payload;
      state.groupsLoading = false;
    },
  },
});
/* eslint-enable no-param-reassign */

export const {
  setGroups,
  setGroupsLoading,
  setGroupsError,
} = tasksSlice.actions;

export const selectGroups = (state) => state.tasks.groups;

export const selectGroupsLoading = (state) => state.tasks.groupsLoading;

export const selectGroupsError = (state) => state.tasks.groupsError;

export const selectTasks = (state) => state.tasks.tasks;

export const loadGroups = () => (dispatch, getState) => {
  const state = getState();
  if (state.tasks.groups || state.tasks.groupsLoading) return;

  const { auth: { user } } = state;

  if (!user) {
    dispatch(setGroupsError('You must be logged in to fetch groups'));
    return;
  }

  dispatch(setGroupsLoading(true));

  api.getGroups(user.token)
    .then((groups) => {
      dispatch(setGroups(groups));
    })
    .catch((err) => setGroupsError(err.message));
};

export default tasksSlice.reducer;
