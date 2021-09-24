import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wrapper from '../../test_helpers/wrapper';
import RegistrationPage from '../RegistrationPage';
import store from '../../app/store';
import { registerUser } from '../../api';

jest.mock('../../api');

describe('Registration', () => {
  it('matches snapshot', () => {
    const tree = renderer
      .create(<Wrapper store={store} Component={RegistrationPage} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays the heading', () => {
    render(<Wrapper store={store} Component={RegistrationPage} />);
    expect(screen.getByText('Registration')).toBeInTheDocument();
  });

  it('displays the login link', async () => {
    render(<Wrapper store={store} Component={RegistrationPage} />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('calls api to register user', async () => {
    registerUser.mockResolvedValue({ user: { email: 'test@example.com', id: 1 } });

    render(<Wrapper store={store} Component={RegistrationPage} />);
    userEvent.type(screen.getByPlaceholderText('Enter Email'), 'test.example.com');
    userEvent.type(screen.getByPlaceholderText('Enter Password'), 'password');
    await userEvent.click(screen.getByText('Register'));
    await Promise.resolve();
    expect(registerUser).toHaveBeenCalledTimes(1);
  });
});
