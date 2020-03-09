import React from 'react';
import { useField } from 'formik';
import NumberFormat from 'react-number-format';

import FormInputWrapper from '../FormInputWrapper';

const NumberInputWrapper = ({ label, options, name, readonly }) => {
  const [field, , helpers] = useField({ name });

  return (
    <FormInputWrapper label={label} options={options}>
      <div className="rs-input-group rs-input-number">
        <NumberFormat
          decimalSeparator=","
          onValueChange={val => helpers.setValue(val.floatValue)}
          decimalScale={2}
          isNumericString
          fixedDecimalScale
          className="rs-input"
          value={field.value}
          disabled={readonly}
        />
      </div>
    </FormInputWrapper>
  );
};

export default NumberInputWrapper;
