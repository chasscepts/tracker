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
    tasks: [],
    tasksLoading: false,
    tasksError: null,
    createRequestCount: 0,
    createError: null,
    updateRequestCount: 0,
    updateError: null,
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
    addCreateTaskRequest: (state) => {
      state.createRequestCount += 1;
    },
    addTask: (state, { payload }) => {
      state.tasks.push(payload);
      if (state.createRequestCount > 0) {
        state.createRequestCount -= 1;
      }
    },
    setCreateTaskError: (state, { payload }) => {
      state.createError = payload;
      if (state.createRequestCount > 0) {
        state.createRequestCount -= 1;
      }
    },
    addUpdateTaskRequest: (state) => {
      state.updateRequestCount += 1;
    },
    updateLocalTask: (state, { payload: { id, title } }) => {
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        task.title = title;
      }
      Object.keys(state.tasksCache).forEach((key) => {
        const task = state.tasksCache[key].find((t) => t.id === id);
        if (task) {
          task.title = title;
        }
      });
      if (state.updateRequestCount > 0) {
        state.updateRequestCount -= 1;
      }
    },
    setUpdateTaskError: (state, { payload }) => {
      state.updateError = payload;
      if (state.updateRequestCount > 0) {
        state.updateRequestCount -= 1;
      }
    },
    deleteLocalTask: (state, { payload }) => {
      state.tasks = state.tasks.filter((t) => t.id !== payload);
      if (state.updateRequestCount > 0) {
        state.updateRequestCount -= 1;
      }
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
  addTask,
  addCreateTaskRequest,
  setCreateTaskError,
  updateLocalTask,
  addUpdateTaskRequest,
  setUpdateTaskError,
  deleteLocalTask,
} = tasksSlice.actions;

export const selectDate = (state) => state.tasks.date;

export const selectGroups = (state) => state.tasks.groups;

export const selectGroupsLoading = (state) => state.tasks.groupsLoading;

export const selectGroupsError = (state) => state.tasks.groupsError;

export const selectTasks = (state) => state.tasks.tasks;

export const selectCreateTaskError = (state) => state.tasks.createError;

export const selectCreateTaskRequestCount = (state) => state.tasks.createRequestCount;

export const selectUpdateTaskError = (state) => state.tasks.updateError;

export const selectUpdateTaskRequestCount = (state) => state.tasks.updateRequestCount;

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

export const loadTasks = () => (dispatch, getState) => {
  const state = getState();

  const { auth: { user } } = state;

  if (!user) {
    dispatch(setTasksError('You must be logged in to fetch tasks'));
    return;
  }

  dispatch(setTasksLoading());

  api.getTasks(user.token, { start: dates.daysAgo(14) })
    .then((tasks) => {
      dispatch(setTasks(tasks));
    })
    .catch((err) => dispatch(setTasksError(err.message)));
};

export const createTask = (groupId, title) => (dispatch, getState) => {
  const state = getState();
  const { auth: { user } } = state;

  if (!user) {
    dispatch(setCreateTaskError('You must be logged in to create tasks'));
    return;
  }

  dispatch(addCreateTaskRequest());

  api.createTask(user.token, groupId, title)
    .then((task) => {
      dispatch(addTask(task));
    })
    .catch((err) => dispatch(setCreateTaskError(err.message)));
};

export const updateTask = (id, title) => (dispatch, getState) => {
  const state = getState();
  const { auth: { user } } = state;

  if (!user) {
    dispatch(setUpdateTaskError('You must be logged in to update tasks'));
    return;
  }

  dispatch(addUpdateTaskRequest());

  api.updateTask(user.token, id, title)
    .then(() => {
      dispatch(updateLocalTask({ id, title }));
    })
    .catch((err) => dispatch(setUpdateTaskError(err.message)));
};

export const deleteTask = (id) => (dispatch, getState) => {
  const state = getState();
  const { auth: { user } } = state;

  if (!user) {
    dispatch(setUpdateTaskError('You must be logged in to delete tasks'));
    return;
  }

  dispatch(addUpdateTaskRequest());

  api.deleteTask(user.token, id)
    .then(() => {
      dispatch(deleteLocalTask(id));
    })
    .catch((err) => dispatch(setUpdateTaskError(err.message)));
};

export default tasksSlice.reducer;
