import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const RequireNotAuth = ({ children, isLoggedIn, redirectTo }) => {
  return isLoggedIn ? <Redirect to={redirectTo} /> : children;
};

RequireNotAuth.propTypes = {
  children: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default RequireNotAuth;
