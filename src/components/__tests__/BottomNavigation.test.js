import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import Wrapper from '../../test_helpers/wrapper';
import BottomNavigation from '../../containers/BottomNavigation';
import { createStore } from '../../app/store';
import login from '../../test_helpers/login';

describe('BottomNavigation', () => {
  it('matches snapshot', async () => {
    const store = createStore();
    login(store);
    const tree = renderer
      .create(<Wrapper store={store} Component={BottomNavigation} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays all the links', () => {
    const store = createStore();
    login(store);
    const links = ['Home', 'New Task', 'Edit Tasks', 'Charts'];
    render(<Wrapper store={store} Component={BottomNavigation} />);
    links.forEach((link) => expect(screen.getByText(link)).toBeInTheDocument());
  });
});
