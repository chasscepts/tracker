import { setUser } from '../reducers/authSlice';

const login = async (store) => {
  store.dispatch(setUser({ id: 1, email: 'test@example.com', token: '111111111' }));
  await Promise.resolve();
  return Promise.resolve();
};

export default login;
