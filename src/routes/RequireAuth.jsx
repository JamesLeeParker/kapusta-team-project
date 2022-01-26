import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const RequireAuth = ({ children, isLoggedIn, redirectTo }) => {
  return isLoggedIn ? children : <Redirect to={redirectTo} />;
};

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default RequireAuth;
