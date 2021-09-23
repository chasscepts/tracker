import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegistrationPage from '../RegistrationPage';
import store from '../../app/store';
import { registerUser } from '../../api';

jest.mock('../../api');

function Wrapper() {
  return (
    <Provider store={store}>
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    </Provider>
  );
}

describe('Registration', () => {
  it('matches snapshot', () => {
    const tree = renderer
      .create(<Wrapper />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays the heading', () => {
    render(<Wrapper />);
    expect(screen.getByText('Registration')).toBeInTheDocument();
  });

  it('displays the login link', async () => {
    render(<Wrapper />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('calls api to register user', async () => {
    registerUser.mockResolvedValue({ user: { email: 'test@example.com', id: 1 } });

    render(<Wrapper />);
    userEvent.type(screen.getByPlaceholderText('Enter Email'), 'test.example.com');
    userEvent.type(screen.getByPlaceholderText('Enter Password'), 'password');
    await userEvent.click(screen.getByText('Register'));
    await Promise.resolve();
    expect(registerUser).toHaveBeenCalledTimes(1);
  });
});
