import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../Home';
import { fetchGroups, fetchTasks, fetchUser } from '../../api';
import { formattedDate } from '../../utilities/dates';
import store from '../../app/store';
import LoginPage from '../LoginPage';

jest.mock('../../api');
jest.mock('../../utilities/dates');

const groups = [{ id: 1, title: 'Group 1' }];

const tasks = [
  {
    id: 1,
    title: 'Task 1',
    group_id: 1,
    user_id: 1,
    entries: [
      { id: 1, task_id: 1, entry_date: '2021-09-21', duration: 0 },
    ],
  },
];

function Wrapper() {
  return (
    <Provider store={store}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </Provider>
  );
}

const login = async () => {
  if (store.getState().auth.user) return Promise.resolve();

  fetchUser.mockResolvedValue({ user: { email: 'test@example.com', token: '111111111' } });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </Provider>
  );

  userEvent.type(screen.getByPlaceholderText('Enter Email'), 'test@example.com');
  userEvent.type(screen.getByPlaceholderText('Enter Password'), 'password');
  userEvent.click(screen.getByText('Log In'));

  await Promise.resolve();

  //  await waitFor(() => expect(fetchUser).toHaveBeenCalledTimes(1));
}

describe('Home', () => {

  it('matches snapshot', () => {
    formattedDate.mockReturnValue('September 21, 2021');
    const tree = renderer
      .create(<Wrapper />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays the date', () => {
    formattedDate.mockReturnValue('September 21, 2021');
    render(<Wrapper />);
    expect(screen.getByText('September 21, 2021')).toBeInTheDocument();
  });

  describe('api calls', () => {
    beforeEach(async () => {
    });

    it('displays the groups links', async () => {
      fetchGroups.mockResolvedValue(groups);
      fetchTasks.mockResolvedValue(tasks);
      await login();
      render(<Wrapper />);
      await Promise.resolve();
      groups.forEach((group) => expect(screen.getByText(group.title)).toBeInTheDocument());
    });
  
    it('displays the tasks links', async () => {
      fetchGroups.mockResolvedValue(groups);
      fetchTasks.mockResolvedValue(tasks);
      await login();
      render(<Wrapper />);
      await Promise.resolve();
      tasks.forEach((task) => expect(screen.getByText(task.title)).toBeInTheDocument());
    });
  });
});
