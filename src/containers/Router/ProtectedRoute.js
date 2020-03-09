import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

const ProtectedRoute = ({ children, ...rest }) => {
  const isAuthenticated = useStoreState(state => state.user.isAuthenticated);

  const RedirectToLogin = <Redirect to="/login" />;

  return (
    <Route
      {...rest}
      render={() => (isAuthenticated ? children : RedirectToLogin)}
    />
  );
};

export default ProtectedRoute;
