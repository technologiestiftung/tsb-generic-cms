import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import Login from '~/pages/Login';
import Signup from '~/pages/Signup';
import ForgotPassword from '~/pages/ForgotPassword';
import ChangePassword from '~/pages/ChangePassword';
import Home from '~/pages/Home';
import ApiEditPage from '~/pages/ApiEditPage';
import ApiCreatePage from '~/pages/ApiCreatePage';
import ApiListPage from '~/pages/ApiListPage';
import ConfirmEmail from '~/pages/ConfirmEmail';
import ChangeSuccess from '~/pages/ChangeSuccess';
import ProtectedRoute from './ProtectedRoute';

const ContentWrapper = styled.div`
  height: 100vh;
  overflow: auto;
  background: #fff;
  width: 100%;
  position: relative;
  padding: 10px;
`;

const Router = () => {
  return (
    <ContentWrapper>
      <ProtectedRoute exact path="/">
        <Home />
      </ProtectedRoute>

      <Route exact path="/login">
        <Login />
      </Route>

      <Route exact path="/signup">
        <Signup />
      </Route>

      <Route exact path="/forgot-password">
        <ForgotPassword />
      </Route>

      <Route exact path="/change-password">
        <ChangePassword />
      </Route>

      <Route exact path="/confirm-email">
        <ConfirmEmail />
      </Route>

      <Route exact path="/change-success">
        <ChangeSuccess />
      </Route>

      {config.routes.map(route => (
        <Switch key={route.endpoint}>
          <ProtectedRoute exact path={`${route.endpoint}/create`}>
            <ApiCreatePage routeConfig={route} />
          </ProtectedRoute>
          <ProtectedRoute exact path={`${route.endpoint}/:id`}>
            <ApiEditPage routeConfig={route} />
          </ProtectedRoute>
          <ProtectedRoute path={route.endpoint}>
            <ApiListPage routeConfig={route} />
          </ProtectedRoute>
        </Switch>
      ))}
    </ContentWrapper>
  );
};

export default Router;
