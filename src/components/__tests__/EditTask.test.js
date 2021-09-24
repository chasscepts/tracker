import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wrapper from '../../test_helpers/wrapper';
import EditTasks from '../EditTasks';
import { updateTask, deleteTask } from '../../api';
import { createStore } from '../../app/store';
import login from '../../test_helpers/login';
import { setTasks } from '../../reducers/tasksSlice';

jest.mock('../../api');

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

describe('EditTask', () => {
  it('matches snapshot', async () => {
    const store = createStore();
    store.dispatch(setTasks(tasks));
    const tree = renderer
      .create(<Wrapper store={store} Component={EditTasks} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('update calls api with correct parameter', async () => {
    const store = createStore();
    login(store);
    store.dispatch(setTasks(tasks));
    const title = 'Updated Title';
    const task = tasks[0];

    updateTask.mockResolvedValue({ id: 1, title });

    render(<Wrapper store={store} Component={EditTasks} />);
    const input = screen.getByPlaceholderText('Enter New Title');
    userEvent.click(screen.getByRole('button', { name: `${task.title}` }));
    userEvent.clear(input);
    userEvent.type(input, title);
    userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    await Promise.resolve();
    expect(updateTask).toHaveBeenCalledWith(expect.any(String), task.id, title);
  });

  it('delete calls api with correct paremeters', async () => {
    const store = createStore();
    login(store);
    store.dispatch(setTasks(tasks));
    const task = tasks[0];

    deleteTask.mockResolvedValue('');

    render(<Wrapper store={store} Component={EditTasks} />);
    userEvent.click(screen.getByRole('button', { name: `${task.title}` }));
    userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(deleteTask).toHaveBeenCalledWith(expect.any(String), task.id);
  });
});
