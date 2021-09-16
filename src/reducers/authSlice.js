import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

/* eslint-disable no-param-reassign */
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authenticated: false,
    loginError: null,
    registrationError: null,
    token: null,
    registrationSuccess: false,
  },
  reducers: {
    setToken: (state, { payload }) => {
      state.authenticated = true;
      state.token = payload;
      state.loginError = null;
      state.registrationError = null;
      state.registrationSuccess = false;
    },
    setLoginError: (state, { payload }) => {
      state.authenticated = false;
      state.token = null;
      state.loginError = payload;
      state.registrationError = null;
      state.registrationSuccess = false;
    },
    setRegistrationError: (state, { payload }) => {
      state.authenticated = false;
      state.token = null;
      state.loginError = null;
      state.registrationError = payload;
      state.registrationSuccess = false;
    },
    setRegistrationSuccess: (state) => {
      state.authenticated = false;
      state.token = null;
      state.loginError = null;
      state.registrationError = null;
      state.registrationSuccess = true;
    },
    logout: (state) => {
      state.authenticated = false;
      state.token = null;
      state.loginError = null;
      state.registrationError = null;
      state.registrationSuccess = false;
    },
  },
});
/* eslint-enable no-param-reassign */

export const {
  setToken,
  setLoginError,
  setRegistrationError,
  setRegistrationSuccess,
  logout,
} = authSlice.actions;

export const login = (email, password) => (dispatch) => {
  const url = 'http://localhost/auth';
  axios({
    url,
    method: 'post',
    responseType: 'json',
    data: { email, password },
  })
    .then((res) => {
      dispatch(setToken(res.data.token));
    })
    .catch((err) => {
      if (!err) {
        dispatch(setLoginError('Unknown error encountered. Please try again.'));
        return;
      }
      if (err.response) {
        dispatch(setLoginError(err.response.data));
        return;
      }
      if (err.request) {
        dispatch(setLoginError('Server is not responding.'));
        return;
      }
      if (err.message) {
        dispatch(setLoginError(err.message));
        return;
      }
      if (typeof err === 'string') {
        dispatch(setLoginError(err));
        return;
      }
      dispatch(setLoginError('Unknown error encountered. Please try again.'));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const register = (email, password) => (dispatch) => {
  const url = 'http://localhost/auth/register';
  axios({
    url,
    method: 'post',
    responseType: 'json',
    data: { email, password },
  })
    .then(() => {
      dispatch(setRegistrationSuccess());
    })
    .catch((err) => {
      if (!err) {
        dispatch(setRegistrationError('An unknown error encountered. Please try again.'));
        return;
      }
      if (err.response) {
        dispatch(setRegistrationError(err.response.data));
        return;
      }
      if (err.request) {
        dispatch(setRegistrationError('Server is not responding.'));
        return;
      }
      if (err.message) {
        dispatch(setRegistrationError(err.message));
        return;
      }
      if (typeof err === 'string') {
        dispatch(setRegistrationError(err));
        return;
      }
      dispatch(setRegistrationError('An unknown error encountered. Please try again.'));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const selectAuthenticated = (state) => state.auth.authenticated;

export const selectLoginError = (state) => state.auth.loginError;

export const selectRegistrationError = (state) => state.auth.registrationError;

export default authSlice.reducer;
