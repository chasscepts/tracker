import { createSlice } from "@reduxjs/toolkit";

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

export const {
  setGroups,
  setGroupsLoading,
  setGroupsError,
} = tasksSlice.actions;

export const selectGroups = (state) => state.tasks.groups;

export const selectGroupsLoading = (state) => state.tasks.groupsLoading;

export const selectGroupsError = (state) => state.tasks.groupsError;

export const loadGroups = () => (getState, dispatch) => {
  const state = getState();
  if (state.tasks.groups) return;

  const { auth: { fetcher } } = state;

  if (!fetcher) {
    dispatch(setGroupsError('You must be logged in to fetch groups'));
    return;
  }

  dispatch(setGroupsLoading(true));

  fetcher.getGroups()
    .then((groups) => dispatch(setGroups(groups)))
    .catch((err) => setGroupsError(err.message));
};

export default tasksSlice.reducer;
