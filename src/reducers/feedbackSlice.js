import { createSlice } from '@reduxjs/toolkit';

/* eslint-disable no-param-reassign */
const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    id: 0,
    feedbacks: [],
  },
  reducers: {
    addFeedback: (state, { payload }) => {
      state.feedbacks.push({ id: state.id, payload });
      state.id += 1;
    },
    removeFeedback: (state, { payload }) => {
      state.feedbacks = state.feedbacks.filter((f) => f.id !== payload);
    },
  },
});
/* eslint-enable no-param-reassign */

export const { addFeedback, removeFeedback } = feedbackSlice.actions;

export const selectFeedbacks = (state) => state.feedback.feedbacks;

export default feedbackSlice.reducer;
