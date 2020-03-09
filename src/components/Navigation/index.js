import React from 'react';
import styled from 'styled-components';
import { useStoreState } from 'easy-peasy';
import { Sidenav } from 'rsuite';

import Logo from '~/components/Logo';
import LoggedInMenu from './LoggedInMenu';
import LoggedOutMenu from './LoggedOutMenu';

const Nav = styled.div`
  width: 270px;
  height: 100vh;
  flex-shrink: 0;

  .rs-sidenav {
    height: 100%;
  }

  a:hover {
    text-decoration: none;
  }
`;

const Navigation = () => {
  const isAuthenticated = useStoreState(state => state.user.isAuthenticated);

  return (
    <Nav>
      <Sidenav>
        <Sidenav.Header>
          <Logo />
        </Sidenav.Header>
        {isAuthenticated ? <LoggedInMenu /> : <LoggedOutMenu />}
      </Sidenav>
    </Nav>
  );
};

export default Navigation;
