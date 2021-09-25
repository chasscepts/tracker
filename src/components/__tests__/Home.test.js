import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import Wrapper from '../../test_helpers/wrapper';
import Home from '../Home';
import { fetchGroups, fetchTasks } from '../../api';
import { formattedDate } from '../../utilities/dates';
import store from '../../app/store';
import login from '../../test_helpers/login';

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
      {
        id: 1, task_id: 1, entry_date: '2021-09-21', duration: 0,
      },
    ],
  },
];

describe('Home', () => {
  it('matches snapshot', () => {
    formattedDate.mockReturnValue('September 21, 2021');
    const tree = renderer.create(<Wrapper Component={Home} />);
    expect(tree.toJSON()).toMatchSnapshot();
    tree.unmount();
  });

  it('displays the date', () => {
    formattedDate.mockReturnValue('September 21, 2021');
    render(<Wrapper Component={Home} />);
    expect(screen.getByText('September 21, 2021')).toBeInTheDocument();
  });

  describe('api calls', () => {
    it('displays the groups links', async () => {
      fetchGroups.mockResolvedValue(groups);
      fetchTasks.mockResolvedValue(tasks);
      await login(store);
      render(<Wrapper Component={Home} />);
      await Promise.resolve();
      groups.forEach((group) => expect(screen.getByText(group.title)).toBeInTheDocument());
    });

    it('displays the tasks links', async () => {
      fetchGroups.mockResolvedValue(groups);
      fetchTasks.mockResolvedValue(tasks);
      await login(store);
      render(<Wrapper Component={Home} />);
      await Promise.resolve();
      tasks.forEach((task) => expect(screen.getByText(task.title)).toBeInTheDocument());
    });
  });
});
