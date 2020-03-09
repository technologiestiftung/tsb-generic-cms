import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Button } from 'rsuite';
import styled from 'styled-components';
import { useStoreState } from 'easy-peasy';
import { Redirect } from 'react-router-dom';

import UserApi from '~/services/UserApi';
import TextInput, {
  EMailInput,
  PasswordInput,
} from '~/components/Forms/TextInput';
import FormInputError from '~/components/Forms/FormInputError';
import PageWrapper from './PageWrapper';

const initialValues = {
  email: '',
  password: '',
  meta: {
    institutionName: '',
    name: '',
    contactEmail: '',
    phone: '',
  },
};

const SignupWrapper = styled.div`
  margin-top: 20px;
`;

const SignupTitle = styled.div`
  font-weight: 16px;
  font-weight: 700;
`;

const SignupDone = () => (
  <SignupWrapper>
    <SignupTitle>Registrierung erfolgreich</SignupTitle>
    <div>Bitte bestätigen Sie Ihre E-Mail Adresse.</div>
  </SignupWrapper>
);

const Signup = () => {
  const userRole = useStoreState(state => state.user.role);
  const [signupError, setSignupError] = useState(null);
  const [signupDone, setSignupDone] = useState(null);

  const isAuthenticated = useStoreState(state => state.user.isAuthenticated);

  const submitError = (errorMessage = 'Signup failed. Please try again.') => {
    setSignupError(errorMessage);
    setSignupDone(false);
  };

  const submitSuccess = res => {
    if (res.error) {
      submitError(res.message);
    } else {
      setSignupError(null);
      setSignupDone(true);
    }
  };

  const onSubmit = payload => {
    setSignupError(null);
    setSignupDone(null);

    UserApi.create(payload)
      .then(submitSuccess)
      .catch(submitError);
  };

  if (isAuthenticated && !userRole === 'ADMIN') {
    return <Redirect to="/" />;
  }

  return (
    <PageWrapper title="Signup">
      {signupDone ? (
        <SignupDone />
      ) : (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            {signupError && <FormInputError error={signupError} />}
            <EMailInput label="E-Mail" name="email" required />
            <PasswordInput label="Passwort" name="password" required />

            <TextInput
              label="Institution"
              name="meta.institutionName"
              required
            />
            <TextInput label="Ansprechpartner" name="meta.name" required />
            <EMailInput
              label="E-Mail Ansprechpartner"
              name="meta.contactEmail"
              required
            />
            <TextInput label="Telefonnummer" name="meta.phone" required />

            <div style={{ marginTop: 10 }}>
              <Button type="submit" appearance="primary">
                Registrieren
              </Button>
            </div>
          </Form>
        </Formik>
      )}
    </PageWrapper>
  );
};

export default Signup;
