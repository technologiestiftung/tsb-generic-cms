import React, { useState } from 'react';
import { Button } from 'rsuite';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { Redirect } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

import { EMailInput } from '~/components/Forms/TextInput';
import PageWrapper from './PageWrapper';
import UserApi from '~/services/UserApi';

import FormInputError from '~/components/Forms/FormInputError';

const MailDoneWrapper = styled.div`
  margin-top: 20px;
`;

const MailDoneTitle = styled.div`
  font-weight: 16px;
  font-weight: 700;
`;

const MailDone = () => (
  <MailDoneWrapper>
    <MailDoneTitle>Passwort zurücksetzen erfolgreich.</MailDoneTitle>
    <div>Bitte schauen Sie in Ihrem E-Mail Postfach.</div>
  </MailDoneWrapper>
);

const ForgotPassword = () => {
  const [mailError, setMailError] = useState(null);
  const [mailDone, setMailDone] = useState(null);
  const isAuthenticated = useStoreState(state => state.user.isAuthenticated);

  const mailSuccess = () => {
    setMailError(null);
    setMailDone(true);
  };

  const mailFail = () => {
    setMailError('Fehler: Die Mail konnte nicht gesendeet werden.');
    setMailDone(false);
  };

  const onSubmit = payload => {
    setMailError(null);
    setMailDone(null);

    UserApi.requestPasswordReset(payload)
      .then(mailSuccess)
      .catch(mailFail);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <PageWrapper title="Passwort zurücksetzen">
      {mailDone ? (
        <MailDone />
      ) : (
        <Formik initialValues={{ email: '' }} onSubmit={onSubmit}>
          <Form>
            {mailError && <FormInputError error={mailError} />}
            <EMailInput label="E-Mail" name="email" />
            <div style={{ marginTop: 10 }}>
              <Button type="submit" appearance="primary">
                Senden
              </Button>
            </div>
          </Form>
        </Formik>
      )}
    </PageWrapper>
  );
};

export default ForgotPassword;
