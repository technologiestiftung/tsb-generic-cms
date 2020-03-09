import React, { useState } from 'react';
import { Checkbox, CheckboxGroup } from 'rsuite';
import { useField } from 'formik';

import FormInputWrapper from '~/components/Forms/FormInputWrapper';

const getOptionLimit = options => {
  const maxRule = (options.rules || []).find(rule => rule.name === 'max');
  return maxRule?.args?.limit || false;
};

const CheckboxGroupComponent = ({ label, name, options, readonly }) => {
  const [field, , helpers] = useField({ name });
  const [showLimitError, toggleLimitError] = useState(false);
  const selectOptions = options.items?.[0]?.allow || [];
  const optionLimit = getOptionLimit(options);

  const handleChange = values => {
    if (optionLimit && values.length > optionLimit) {
      // display error
      toggleLimitError(true);
      return helpers.setValue(values.slice(0, optionLimit));
    }
    toggleLimitError(false);
    return helpers.setValue(values);
  };

  const validationError = showLimitError
    ? `Sie dürfen maximal ${optionLimit} Optionen auswählen.`
    : false;

  const visibleOptions = selectOptions.filter(opt => opt);

  return (
    <FormInputWrapper label={label} options={options} error={validationError}>
      <CheckboxGroup onChange={handleChange} value={field.value}>
        {visibleOptions.map(option => (
          <Checkbox value={option} key={option} disabled={readonly}>
            {option}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </FormInputWrapper>
  );
};

export default CheckboxGroupComponent;
