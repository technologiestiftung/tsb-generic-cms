import React from 'react';
import { SelectPicker } from 'rsuite';
import { useField } from 'formik';

import FormInputWrapper from '~/components/Forms/FormInputWrapper';

const Select = ({ label, options, name, readonly }) => {
  const [field, , helpers] = useField({ name });
  const selectOptions = options.allow || [];
  const data = selectOptions.filter(d => d).map(d => ({ value: d, label: d }));

  return (
    <FormInputWrapper label={label} options={options}>
      <SelectPicker
        value={field.value}
        data={data}
        searchable={false}
        style={{ width: '100%' }}
        onChange={val => helpers.setValue(val)}
        placeholder="Auswählen"
        disabled={readonly}
      />
    </FormInputWrapper>
  );
};

export default Select;
