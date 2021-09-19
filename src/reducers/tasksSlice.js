import { createSlice } from '@reduxjs/toolkit';
import api from '../api';
import { dates } from '../utilities';

/* eslint-disable no-param-reassign */
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    date: dates.today(),
    groups: null,
    groupsLoading: false,
    groupsError: null,
    tasksCache: {},
    tasks: null,
    tasksLoading: false,
    tasksError: null,
  },
  reducers: {
    setDate: (state, { payload }) => {
      state.date = payload;
    },
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
    setTasks: (state, { payload }) => {
      state.tasks = payload;
    },
    setTasksLoading: (state, { payload }) => {
      state.tasksLoading = payload;
    },
    setTasksError: (state, { payload }) => {
      state.tasksError = payload;
    },
    updateTasksCache: (state, { payload: { date, tasks } }) => {
      state.tasksCache[date] = tasks;
    },
  },
});
/* eslint-enable no-param-reassign */

export const {
  setDate,
  setGroups,
  setGroupsLoading,
  setGroupsError,
  setTasks,
  setTasksLoading,
  setTasksError,
  updateTasksCache,
} = tasksSlice.actions;

export const selectDate = (state) => state.tasks.date;

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

export const loadTasks = (date) => (dispatch, getState) => {
  const state = getState();
  const tasks = state.tasks.tasksCache[date];
  if (tasks) {
    dispatch(setTasks(tasks));
    return;
  }

  const { auth: { user } } = state;

  if (!user) {
    dispatch(setTasksError('You must be logged in to fetch tasks'));
    return;
  }

  dispatch(setTasksLoading());

  api.getTasks(user.token, { date })
    .then((tasks) => {
      dispatch(setTasks(tasks));
      dispatch(updateTasksCache({ date, tasks }));
    })
    .catch((err) => dispatch(setTasksError(err.message)));
};

export default tasksSlice.reducer;
