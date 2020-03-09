/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useStoreState } from 'easy-peasy';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';

import UserApi from '~/services/UserApi';
import PageWrapper from './PageWrapper';

const ConfirmEmail = () => {
  const isAuthenticated = useStoreState(state => state.user.isAuthenticated);
  const [confirmError, setConfirmError] = useState(null);
  const params = queryString.parse(window.location.search);
  const validRequest = !isAuthenticated && params.email && params.token;

  const confirmFail = payload => {
    const errorMessage = `Fehler: Ihre E-Mail konnte nicht bestätigt werden ${
      payload.message ? `(${payload.message})` : ''
    }.`;
    setConfirmError(errorMessage);
  };

  const confirmSuccess = payload => {
    if (payload.error) {
      return confirmFail(payload);
    }

    return setConfirmError(null);
  };

  useEffect(() => {
    if (validRequest) {
      setConfirmError(null);

      UserApi.confirmEmail({ email: params.email, token: params.token })
        .then(confirmSuccess)
        .catch(confirmFail);
    }
  }, []);

  if (!validRequest) {
    return <Redirect to="/" />;
  }

  return (
    <PageWrapper title="E-Mail Bestätigung">
      <div style={{ marginTop: 10 }}>
        {confirmError || (
          <>
            Vielen Dank für Ihre Bestätigung.
            <br />
            Sobald ein Admin Ihren Account bestätigt hat, können Sie Ihren
            Account nutzen.
          </>
        )}
      </div>
    </PageWrapper>
  );
};

export default ConfirmEmail;
