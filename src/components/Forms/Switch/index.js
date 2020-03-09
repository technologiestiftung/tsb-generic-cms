import React from 'react';
import { Toggle } from 'rsuite';
import { useField } from 'formik';

import FormInputWrapper from '~/components/Forms/FormInputWrapper';

const SwitchComponent = ({ label, name, options, readonly }) => {
  const [field, , helpers] = useField({ name });
  return (
    <FormInputWrapper label={label} options={options}>
      <Toggle
        checked={field.value}
        onChange={checked => helpers.setValue(checked)}
        disabled={readonly}
      />
    </FormInputWrapper>
  );
};

export default SwitchComponent;
