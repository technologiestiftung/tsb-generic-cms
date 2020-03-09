import React from 'react';
import { Input } from 'rsuite';
import { useField } from 'formik';

import FormInputWrapper from '~/components/Forms/FormInputWrapper';

const TextAreaInput = ({ label, name, options, readonly }) => {
  const [field, , helpers] = useField({ name });

  return (
    <FormInputWrapper label={label} options={options}>
      <Input
        onChange={val => helpers.setValue(val)}
        componentClass="textarea"
        value={field.value}
        disabled={readonly}
      />
    </FormInputWrapper>
  );
};

export default TextAreaInput;
