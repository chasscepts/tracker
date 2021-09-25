import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, waitFor } from '@testing-library/react';
import Wrapper from '../../test_helpers/wrapper';
import Stopwatch from '../Stopwatch';
import { updateEntry } from '../../api';
import { createStore } from '../../app/store';
import login from '../../test_helpers/login';
import { setTasks } from '../../reducers/tasksSlice';
import { subscribe, elapsedTime } from '../../utilities/timer';
import Router from 'react-router';
import userEvent from '@testing-library/user-event';

jest.mock('../../utilities/timer', () => ({
  ...jest.requireActual('../../utilities/timer'),
  subscribe: jest.fn(),
  elapsedTime: jest.fn(),
}));

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

describe('Stopwatch', () => {
  it('matches snapshot', () => {
    const store = createStore();
    login(store);
    const tree = renderer.create(<Wrapper Component={Stopwatch} store={store} />);
    expect(tree.toJSON()).toMatchSnapshot();
    tree.unmount();
  });

  it('displays a "select task" prompt', () => {
    const store = createStore();
    login(store); 
    render(<Wrapper Component={Stopwatch} store={store} />);
    expect(screen.getByText('Please Select a Task')).toBeInTheDocument();
  });

  it('does not display start button when entry is not selected', () => {
    const store = createStore();
    login(store); 
    render(<Wrapper Component={Stopwatch} store={store} />);
    expect(screen.queryByRole('button', { name: 'Start Task' })).not.toBeInTheDocument();
  });

  it('display start button when entry is selected', () => {
    const store = createStore();
    login(store);
    store.dispatch(setTasks(tasks));
    const spy = jest.spyOn(Router, 'useParams').mockReturnValue({ id: 1, taskId: 1 });
    render(<Wrapper Component={Stopwatch} store={store} />);
    expect(screen.getByRole('button', { name: 'Start Task' })).toBeInTheDocument();
    spy.mockClear();
  });

  it('subscribes to timer', async () => {
    const store = createStore();
    await login(store);
    subscribe.mockReturnValue(1);
    const spy = jest.spyOn(Router, 'useParams').mockReturnValue({ });
    render(<Wrapper Component={Stopwatch} store={store} />);
    expect(subscribe).toHaveBeenCalled();
    spy.mockClear();
  });

  it('calls to api to record entry', async () => {
    const store = createStore();
    login(store);
    store.dispatch(setTasks(tasks));
    const spy = jest.spyOn(Router, 'useParams').mockReturnValue({ id: 1, taskId: 1 });
    updateEntry.mockResolvedValue('');
    subscribe.mockReturnValue(1);
    elapsedTime.mockReturnValue(100);
    render(<Wrapper Component={Stopwatch} store={store} />);
    userEvent.click(screen.getByRole('button', { name: 'Start Task' }));
    await waitFor(() => screen.getByRole('button', { name: 'Commit Record' }));
    userEvent.click(screen.getByRole('button', { name: 'Commit Record' }));
    expect(updateEntry).toHaveBeenCalled();
    spy.mockClear();
  });
});
