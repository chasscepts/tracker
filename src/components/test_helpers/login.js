import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import LoginPage from '../LoginPage';
import { fetchUser } from '../../api';

const login = async (store) => {
  if (store.getState().auth.user) return Promise.resolve();

  fetchUser.mockResolvedValue({ user: { email: 'test@example.com', token: '111111111' } });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </Provider>,
  );

  userEvent.type(screen.getByPlaceholderText('Enter Email'), 'test@example.com');
  userEvent.type(screen.getByPlaceholderText('Enter Password'), 'password');
  userEvent.click(screen.getByText('Log In'));

  await Promise.resolve();
  return Promise.resolve();
};

export default login;
