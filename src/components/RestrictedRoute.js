import { useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { selectAuthenticated } from '../reducers/authSlice';

function RedirectToLogin() {
  const location = useLocation();

  return <Redirect to={{ pathname: '/login', state: { from: location.pathname } }} />;
}

export default function RestrictedRoute({ path, component }) {
  const authenticated = useSelector(selectAuthenticated);

  if (authenticated) return <Route path={path} component={component} />;
  return <Route path={path} component={RedirectToLogin} />;
}

RestrictedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired,
};
