import axios from 'axios';
import { today } from '../utilities/dates';

const baseURL = 'https://time-max.herokuapp.com/';

const normalizeError = (err) => {
  if (!err) {
    return { message: 'An unknown error encountered. Please try again.' };
  }
  if (err.response) {
    return { message: err.response.data.message || JSON.stringify(err.response.data) };
  }
  if (err.request) {
    return { message: 'Server is not responding.' };
  }
  if (err.message) {
    return { message: err.message };
  }
  if (typeof err === 'string') {
    return { message: err };
  }
  return { message: 'An unknown error encountered. Please try again.' };
};

const instantiate = (token) => {
  const instance = axios.create({
    baseURL,
    responseType: 'json',
  });
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;

  return instance;
};

/**
 * @param {axios} instance An instance of axios to use for this request
 * @param {string} path relative url
 * @returns Promise that resolves to fetched data when request is successful
 * and rejects with error when request fails
 */
const get = (instance, path) => new Promise((resolve, reject) => {
  instance.get(path)
    .then((res) => resolve(res.data))
    .catch((err) => reject(normalizeError(err)));
});

/**
 * @param {axios} instance An instance of axios to use for this request
 * @param {string} path relative url
 * @param {{ string: any }} data sent in body of this post
 * @returns Promise that resolves to fetched data when request is successful
 * and rejects with error when request fails
 */
const post = (instance, path, data) => new Promise((resolve, reject) => {
  instance.post(path, data)
    .then((res) => resolve(res.data))
    .catch((err) => reject(normalizeError(err)));
});

/**
 * @param {axios} instance An instance of axios to use for this request
 * @param {string} path relative url
 * @param {{ string: any }} data sent in body of this put
 * @returns Promise that resolves when request is successful
 * and rejects with error when request fails
 */
const put = (instance, path, data) => new Promise((resolve, reject) => {
  instance.put(path, data)
    .then((res) => resolve(res.data))
    .catch((err) => reject(normalizeError(err)));
});

/**
 * @param {axios} instance An instance of axios to use for this request
 * @param {string} path relative url
 * @returns Promise that resolves if resource is successfully deleted
 * and rejects with error when request fails
 */
const destroy = (instance, path) => new Promise((resolve, reject) => {
  instance.delete(path)
    .then((res) => resolve(res.data))
    .catch((err) => reject(normalizeError(err)));
});

export const fetchUser = (email, password) => {
  const instance = axios.create({
    baseURL,
    responseType: 'json',
  });
  return post(instance, '/auth', { email, password });
};

export const registerUser = (email, password) => {
  const instance = axios.create({
    baseURL: 'http://localhost:3000/',
    responseType: 'json',
  });
  return post(instance, '/auth/register', { email, password });
};

export const fetchGroups = (token) => get(instantiate(token), '/groups');

export const fetchTasks = (token, { date, start, end }) => {
  let path = '/tasks';
  if (date) {
    path = `${path}?date=${date}`;
  } else if (start) {
    path = `${path}?start=${start}`;
    if (end) {
      path = `${path}&end=${end}`;
    }
  } else if (end) {
    path = `${path}?end=${end}`;
  }

  return get(instantiate(token), path);
};

export const updateEntry = (token, entry, duration) => (
  put(instantiate(token), `/entries/${entry.id}`, { duration: entry.duration + duration })
);

export const fetchGroupTasks = (token, id) => (
  get(instantiate(token), `/groups/${id}/tasks?end=${today()}`)
);

export const createTask = (token, groupId, title) => (
  post(instantiate(token), `/groups/${groupId}/tasks/`, { title })
);

export const updateTask = (token, id, title) => put(instantiate(token), `/tasks/${id}`, { title });

export const deleteTask = (token, id) => destroy(instantiate(token), `/tasks/${id}`);
