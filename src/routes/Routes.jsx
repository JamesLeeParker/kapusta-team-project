import { Redirect, Route, Switch } from 'react-router-dom';
import { Suspense } from 'react';
import RequireAuth from './RequireAuth';
import RequireNotAuth from './RequireNotAuth';
import Spinner from 'components/Spinner';
import { requireAuthPages, requireNotAuthPages, defaultPath } from 'routes';
import PropTypes from 'prop-types';

const Routes = ({ isLoggedIn }) => {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        {requireAuthPages.map(({ key, path, Component, exact, redirectTo }) => (
          <Route key={key} exact={exact} path={path}>
            <RequireAuth isLoggedIn={isLoggedIn} redirectTo={redirectTo}>
              <Component />
            </RequireAuth>
          </Route>
        ))}

        {requireNotAuthPages.map(
          ({ key, path, Component, exact, redirectTo }) => (
            <Route key={key} exact={exact} path={path}>
              <RequireNotAuth isLoggedIn={isLoggedIn} redirectTo={redirectTo}>
                <Component />
              </RequireNotAuth>
            </Route>
          ),
        )}

        <Redirect to={defaultPath} />
      </Switch>
    </Suspense>
  );
};

Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Routes;
