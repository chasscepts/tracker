import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wrapper from '../../test_helpers/wrapper';
import NewTask from '../NewTask';
import { createTask } from '../../api';
import { createStore } from '../../app/store';
import login from '../../test_helpers/login';
import { setGroups } from '../../reducers/tasksSlice';

jest.mock('../../api');

const groups = [{ id: 1, title: 'Group 1' }];

describe('NewTask', () => {
  it('matches snapshot', async () => {
    const store = createStore();
    store.dispatch(setGroups(groups));
    const tree = renderer.create(<Wrapper store={store} Component={NewTask} />);
    expect(tree.toJSON()).toMatchSnapshot();
    tree.unmount();
  });

  it('calls api to create new task with correct parameter', async () => {
    const store = createStore();
    login(store);
    store.dispatch(setGroups(groups));
    const title = 'Title';

    createTask.mockResolvedValue({ id: 1, title });

    render(<Wrapper store={store} Component={NewTask} />);
    userEvent.type(screen.getByPlaceholderText('Enter Title'), title);
    await userEvent.click(screen.getByText('Create Task'));
    await Promise.resolve();
    expect(createTask).toHaveBeenCalledWith(expect.any(String), expect.any(Number), title);
  });
});
