import { createSlice } from '@reduxjs/toolkit';
import {
  fetchGroups, fetchTasks, createTask, updateTask, deleteTask,
} from '../api';
import { today, daysAgo } from '../utilities/dates';
import { addFeedback } from './feedbackSlice';

/* eslint-disable no-param-reassign */
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    date: today(),
    groups: null,
    groupsLoading: false,
    tasksCache: {},
    tasks: [],
    tasksLoading: false,
    createRequestCount: 0,
    updateRequestCount: 0,
  },
  reducers: {
    setDate: (state, { payload }) => {
      state.date = payload;
    },
    setGroups: (state, { payload }) => {
      state.groups = payload;
      state.groupsLoading = false;
    },
    setGroupsLoading: (state, { payload }) => {
      state.groupsLoading = payload;
    },
    setTasks: (state, { payload }) => {
      state.tasks = payload;
    },
    setTasksLoading: (state, { payload }) => {
      state.tasksLoading = payload;
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
    removeCreateRequest: (state) => {
      if (state.createRequestCount > 0) {
        state.createRequestCount -= 1;
      }
    },
    addUpdateTaskRequest: (state) => {
      state.updateRequestCount += 1;
    },
    removeUpdateTaskRequest: (state) => {
      if (state.updateRequestCount > 0) {
        state.updateRequestCount -= 1;
      }
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
    deleteLocalTask: (state, { payload }) => {
      state.tasks = state.tasks.filter((t) => t.id !== payload);
      if (state.updateRequestCount > 0) {
        state.updateRequestCount -= 1;
      }
    },
    updateTaskEntry: (state, { payload: { entry, duration } }) => {
      const task = state.tasks.find((t) => t.id === entry.task_id);
      if (task) {
        task.entries[0].duration += duration;
      }
    },
  },
});
/* eslint-enable no-param-reassign */

export const {
  setDate,
  setGroups,
  setGroupsLoading,
  setTasks,
  setTasksLoading,
  updateTasksCache,
  addTask,
  addCreateTaskRequest,
  removeCreateRequest,
  updateLocalTask,
  addUpdateTaskRequest,
  removeUpdateTaskRequest,
  deleteLocalTask,
  updateTaskEntry,
} = tasksSlice.actions;

export const selectDate = (state) => state.tasks.date;

export const selectGroups = (state) => state.tasks.groups;

export const selectGroupsLoading = (state) => state.tasks.groupsLoading;

export const selectTasks = (state) => state.tasks.tasks;

export const selectCreateTaskRequestCount = (state) => state.tasks.createRequestCount;

export const selectUpdateTaskRequestCount = (state) => state.tasks.updateRequestCount;

export const loadGroups = () => (dispatch, getState) => {
  const state = getState();
  if (state.tasks.groups || state.tasks.groupsLoading) return;

  const { auth: { user } } = state;

  if (!user) {
    dispatch(addFeedback({ message: 'You must be logged in to fetch groups', type: 'error' }));
    return;
  }

  dispatch(setGroupsLoading(true));

  fetchGroups(user.token)
    .then((groups) => {
      dispatch(setGroups(groups));
    })
    .catch(({ message }) => {
      dispatch(setGroupsLoading(false));
      dispatch(addFeedback({ message, type: 'error' }));
    });
};

export const loadTasks = () => (dispatch, getState) => {
  const state = getState();

  const { auth: { user } } = state;

  if (!user) {
    dispatch(addFeedback({ message: 'You must be logged in to fetch tasks!', type: 'error' }));
    return;
  }

  dispatch(setTasksLoading());

  fetchTasks(user.token, { start: daysAgo(14) })
    .then((tasks) => {
      dispatch(setTasks(tasks));
    })
    .catch(({ message }) => dispatch(addFeedback({ message, type: 'error' })));
};

export const createTaskAsync = (groupId, title) => (dispatch, getState) => {
  const state = getState();
  const { auth: { user } } = state;

  if (!user) {
    dispatch(addFeedback({ message: 'You must be logged in to create tasks', type: 'error' }));
    return;
  }

  dispatch(addCreateTaskRequest());

  createTask(user.token, groupId, title)
    .then((task) => {
      dispatch(addTask(task));
      dispatch(addFeedback({ message: `The task ${task.title} was successfully created.`, type: 'success' }));
    })
    .catch(({ message }) => {
      dispatch(removeCreateRequest());
      dispatch(addFeedback({ message, type: 'error' }));
    });
};

export const updateTaskAsync = (id, title) => (dispatch, getState) => {
  const state = getState();
  const { auth: { user } } = state;

  if (!user) {
    dispatch(addFeedback({ message: 'You must be logged in to update tasks', type: 'error' }));
    return;
  }

  dispatch(addUpdateTaskRequest());

  updateTask(user.token, id, title)
    .then(() => {
      dispatch(updateLocalTask({ id, title }));
      dispatch(addFeedback({ message: `Task ${title} successfully updated.`, type: 'success' }));
    })
    .catch(({ message }) => {
      dispatch(removeUpdateTaskRequest());
      dispatch(addFeedback({ message, type: 'error' }));
    });
};

export const deleteTaskAsync = (id) => (dispatch, getState) => {
  const state = getState();
  const { auth: { user } } = state;

  if (!user) {
    dispatch(addFeedback({ message: 'You must be logged in to update tasks', type: 'error' }));
    return;
  }

  dispatch(addUpdateTaskRequest());

  deleteTask(user.token, id)
    .then(() => {
      dispatch(deleteLocalTask(id));
      dispatch(addFeedback({ message: 'Task successfully deleted.', type: 'success' }));
    })
    .catch(({ message }) => {
      dispatch(removeUpdateTaskRequest());
      dispatch(addFeedback({ message, type: 'error' }));
    });
};

export default tasksSlice.reducer;
