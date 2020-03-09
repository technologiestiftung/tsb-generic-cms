import React from 'react';
import { TagPicker } from 'rsuite';
import { useField } from 'formik';

import languages from './languages.json';
import FormInputWrapper from '~/components/Forms/FormInputWrapper';

const data = languages.map(d => ({
  value: d,
  label: d,
}));

const LanguageSelect = ({ label, name, options, readonly }) => {
  const [field, , helpers] = useField({ name });

  return (
    <FormInputWrapper label={label} options={options}>
      <TagPicker
        placeholder="Auswählen"
        value={field.value}
        data={data}
        searchable
        style={{ width: '100%' }}
        onChange={val => helpers.setValue(val)}
        disabled={readonly}
      />
    </FormInputWrapper>
  );
};

export default LanguageSelect;
