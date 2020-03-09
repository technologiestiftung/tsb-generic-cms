import React from 'react';
import { Checkbox } from 'rsuite';
import { useField } from 'formik';

import FormInputWrapper from '~/components/Forms/FormInputWrapper';

const CheckboxComponent = ({ name, label, readonly }) => {
  const [field, , helpers] = useField({ name });

  return (
    <FormInputWrapper showLabel={false}>
      <Checkbox
        onChange={(_, checked) => helpers.setValue(checked)}
        checked={field.value}
        disabled={readonly}
      >
        {label}
      </Checkbox>
    </FormInputWrapper>
  );
};

export default CheckboxComponent;
