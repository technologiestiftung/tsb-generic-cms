import React from 'react';
import MultiTagChooser from '~/components/Forms/MultiTagChooser';

const TagChooser = ({ label, name, options, readonly }) => {
  return (
    <MultiTagChooser
      label={label}
      name={name}
      options={options}
      readonly={readonly}
      isSingle
    />
  );
};

export default TagChooser;
