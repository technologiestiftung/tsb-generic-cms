import React from 'react';
import { useField } from 'formik';

// FormInputWrapper stellt das Label und den Erklärtext zu dem Input-Feld dar
import FormInputWrapper from '~/components/Forms/FormInputWrapper';

const ExampleInput = ({ name, label, options, readonly }) => {
  // Input mit Formik verbinden
  const [field, , helpers] = useField({ name });

  // Change-Handler ändert den Wert des Feldes in der Form
  const handleChange = evt => {
    helpers.setValue(evt.target.value);
  };

  return (
    <FormInputWrapper label={label} options={options} readonly={readonly}>
      <input type="text" onChange={handleChange} value={field.value} />
    </FormInputWrapper>
  );
};

export default ExampleInput;
