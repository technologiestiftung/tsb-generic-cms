import React, { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';

import Router from '~/containers/Router';
import Navigation from '~/components/Navigation';
import Flex from '~/components/Flex';

const App = () => {
  const refreshTokenAction = useStoreActions(
    actions => actions.user.refreshAccessToken
  );

  useEffect(() => {
    refreshTokenAction();
  }, [refreshTokenAction]);

  return (
    <Flex>
      <Navigation />
      <Router />
    </Flex>
  );
};

export default App;
