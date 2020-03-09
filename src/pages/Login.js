import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Redirect } from 'react-router-dom';
import { ButtonToolbar, Button } from 'rsuite';
import { Formik, Form } from 'formik';

import { EMailInput, PasswordInput } from '~/components/Forms/TextInput';
import FormInputError from '~/components/Forms/FormInputError';
import PageWrapper from './PageWrapper';

const Login = () => {
  const isAuthenticated = useStoreState(state => state.user.isAuthenticated);
  const loginError = useStoreState(state => state.user.loginError);
  const loading = useStoreState(state => state.user.loading);
  const loginAction = useStoreActions(actions => actions.user.login);

  const handleSubmit = values => {
    loginAction(values);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <PageWrapper title="Login">
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
      >
        <Form>
          {loginError && <FormInputError error={loginError} />}
          <EMailInput disabled={loading} label="E-Mail" name="email" />
          <PasswordInput disabled={loading} label="Passwort" name="password" />
          <div>
            <a href="/forgot-password">Passwort vergessen</a>
            <span style={{ padding: 5 }}>|</span>
            <a href="/signup">Registrieren</a>
          </div>
          <ButtonToolbar>
            <Button loading={loading} type="submit" appearance="primary">
              Login
            </Button>
          </ButtonToolbar>
        </Form>
      </Formik>
    </PageWrapper>
  );
};

export default Login;
