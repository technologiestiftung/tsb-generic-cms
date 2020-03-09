import React, { useState } from 'react';
import { Button } from 'rsuite';
import { Formik, Form } from 'formik';
import { Redirect } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import queryString from 'query-string';

import { EMailInput, PasswordInput } from '~/components/Forms/TextInput';
import FormInputError from '~/components/Forms/FormInputError';

import PageWrapper from './PageWrapper';
import UserApi from '~/services/UserApi';

const ChangePassword = () => {
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);
  const isAuthenticated = useStoreState(state => state.user.isAuthenticated);
  const params = queryString.parse(window.location.search);

  const success = () => {
    setDone(true);
    setError(null);
  };

  const fail = () => {
    setError('Fehler: Das Passwort konnte nicht zurückgesetzt werden.');
    setDone(false);
  };

  const onSubmit = payload => {
    setError(null);
    setDone(null);

    UserApi.changePassword({ ...payload, token: params.token })
      .then(success)
      .catch(fail);
  };

  if (isAuthenticated || !params.token || done) {
    return <Redirect to="/" />;
  }

  return (
    <PageWrapper title="Password ändern">
      <Formik initialValues={{ email: '', password: '' }} onSubmit={onSubmit}>
        <Form>
          {error && <FormInputError error={error} />}
          <EMailInput label="E-Mail" name="email" required />
          <PasswordInput label="Passwort" name="password" required />

          <div style={{ marginTop: 10 }}>
            <Button type="submit" appearance="primary">
              Senden
            </Button>
          </div>
        </Form>
      </Formik>
    </PageWrapper>
  );
};

export default ChangePassword;
