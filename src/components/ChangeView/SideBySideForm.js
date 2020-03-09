import React from 'react';
import styled from 'styled-components';

import ChangeForm from './ChangeForm';

const SideBySideWrapper = styled.div`
  display: flex;
`;

const SideBySideView = styled.div`
  width: 50%;
  padding: 15px;
`;

const SideBySideForm = ({ data, schema }) => {
  if (!data || !schema) {
    return null;
  }

  const newData = data.data || {};
  const oldData = data.meta?.target || {};

  return (
    <SideBySideWrapper>
      <SideBySideView>
        <ChangeForm
          appendTitle=" - alte Version"
          data={oldData}
          schema={schema}
        />
      </SideBySideView>
      <SideBySideView>
        <ChangeForm
          appendTitle=" - neue Version"
          data={newData}
          schema={schema}
        />
      </SideBySideView>
    </SideBySideWrapper>
  );
};

export default SideBySideForm;
