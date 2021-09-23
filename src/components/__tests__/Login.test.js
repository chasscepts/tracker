import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '../LoginPage';
import store from '../../app/store';
import { fetchGroups, fetchTasks, fetchUser } from '../../api';

jest.mock('../../api');

const groups = [{ id: 1, title: 'Group 1' }];

const tasks = [
  {
    id: 1,
    title: 'Task 1',
    group_id: 1,
    user_id: 1,
    entries: [
      {
        id: 1, task_id: 1, entry_date: '2021-09-21', duration: 0,
      },
    ],
  },
];

function Wrapper() {
  return (
    <Provider store={store}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </Provider>
  );
}

describe('Login', () => {
  it('matches snapshot', () => {
    const tree = renderer
      .create(<Wrapper />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays the heading', () => {
    render(<Wrapper />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('displays the register link', async () => {
    render(<Wrapper />);
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('calls api to fetch user', async () => {
    fetchUser.mockResolvedValue({ user: { email: 'test@example.com', token: '111111111' } });
    fetchGroups.mockResolvedValue(groups);
    fetchTasks.mockResolvedValue(tasks);

    render(<Wrapper />);
    userEvent.type(screen.getByPlaceholderText('Enter Email'), 'test.example.com');
    userEvent.type(screen.getByPlaceholderText('Enter Password'), 'password');
    await userEvent.click(screen.getByText('Log In'));
    await Promise.resolve();
    expect(fetchUser).toHaveBeenCalledTimes(1);
  });
});
