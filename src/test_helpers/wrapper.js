import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from '../app/store';
/* eslint-disable react/prop-types */

function Wrapper({ store, Component }) {
  return (
    <Provider store={store || appStore}>
      <MemoryRouter>
        <Component />
      </MemoryRouter>
    </Provider>
  );
}

export default Wrapper;
