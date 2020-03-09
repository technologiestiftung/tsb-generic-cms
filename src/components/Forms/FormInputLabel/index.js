import React from 'react';
import { Whisper, Popover, Icon } from 'rsuite';

import Flex from '~/components/Flex';

const FormInputLabel = ({ label, options }) => {
  const description = options?.flags?.description;
  const speaker = <Popover>{description}</Popover>;

  if (!label) {
    return null;
  }

  if (!description) {
    return <div>{label}</div>;
  }

  return (
    <Flex alignItems="center">
      <div>{label}</div>
      <Whisper placement="topStart" trigger="hover" speaker={speaker}>
        <Icon style={{ color: '#999', marginLeft: 5 }} icon="info-circle" />
      </Whisper>
    </Flex>
  );
};

export default FormInputLabel;
