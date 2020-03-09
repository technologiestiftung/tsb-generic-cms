import React from 'react';
import styled from 'styled-components';

const CenteredContent = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
`;

const PageWrapper = ({ title, children }) => {
  return (
    <CenteredContent>
      {title && <h2>{title}</h2>}
      {children}
    </CenteredContent>
  );
};

export default PageWrapper;
