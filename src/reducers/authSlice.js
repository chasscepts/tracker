import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

/* eslint-disable no-param-reassign */
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    authenticated: false,
    loginError: null,
    registrationError: null,
    registrationSuccess: false,
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.authenticated = true;
      state.user = payload;
      state.loginError = null;
      state.registrationError = null;
      state.registrationSuccess = false;
      state.loginSuccess = true;
    },
    setLoginError: (state, { payload }) => {
      state.authenticated = false;
      state.user = null;
      state.loginError = payload;
      state.registrationError = null;
      state.registrationSuccess = false;
    },
    clearLoginError: (state) => {
      state.loginError = null;
    },
    setRegistrationError: (state, { payload }) => {
      state.authenticated = false;
      state.user = null;
      state.loginError = null;
      state.registrationError = payload;
      state.registrationSuccess = false;
    },
    clearRegistrationError: (state) => {
      state.registrationError = null;
    },
    setRegistrationSuccess: (state, { payload }) => {
      state.registrationSuccess = payload;
    },
    logout: (state) => {
      state.authenticated = false;
      state.user = null;
      state.loginError = null;
      state.registrationError = null;
      state.registrationSuccess = false;
    },
  },
});
/* eslint-enable no-param-reassign */

export const {
  setUser,
  setLoginError,
  clearLoginError,
  setRegistrationError,
  clearRegistrationError,
  setRegistrationSuccess,
  logout,
} = authSlice.actions;

export const login = (email, password) => (dispatch) => {
  const url = 'http://localhost:3000/auth';
  axios({
    url,
    method: 'post',
    responseType: 'json',
    data: { email, password },
  })
    .then((res) => {
      dispatch(setUser(res.data.user));
    })
    .catch((err) => {
      if (!err) {
        dispatch(setLoginError('Unknown error encountered. Please try again.'));
        return;
      }
      if (err.response) {
        const msg = err.response.data.message || err.response.data;
        dispatch(setLoginError(msg));
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
  const url = 'http://localhost:3000/auth/register';
  axios({
    url,
    method: 'post',
    responseType: 'json',
    data: { email, password },
  })
    .then(() => {
      dispatch(setRegistrationSuccess(true));
    })
    .catch((err) => {
      if (!err) {
        dispatch(setRegistrationError('An unknown error encountered. Please try again.'));
        return;
      }
      if (err.response) {
        dispatch(setRegistrationError(err.response.data.message || err.response.data));
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

export const selectUser = (state) => state.auth.user;

export const selectAuthenticated = (state) => state.auth.authenticated;

export const selectLoginError = (state) => state.auth.loginError;

export const selectRegistrationSuccess = (state) => state.auth.registrationSuccess;

export const selectRegistrationError = (state) => state.auth.registrationError;

export default authSlice.reducer;
