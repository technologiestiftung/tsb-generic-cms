import React from 'react';
import styled from 'styled-components';

import TSBLogo from '~/images/tsb-logo.svg';

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f7f7fa;
  color: ${p => p.theme.colors.primary};
  padding: 14px;
  font-weight: 900;
  border-bottom: 1px solid #eee;
  user-select: none;
  cursor: pointer;
`;

const LogoHeadline = styled.div`
  font-size: 1.3em;
  margin-left: 10px;
`;

const Logo = () => {
  return (
    <a href="/">
      <LogoWrapper>
        <TSBLogo width="40" viewBox="0 0 59 44" />
        <LogoHeadline>CultureMix</LogoHeadline>
      </LogoWrapper>
    </a>
  );
};

export default Logo;
