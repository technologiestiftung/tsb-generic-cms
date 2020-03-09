import React from 'react';
import { InputGroup, Input } from 'rsuite';
import { useField } from 'formik';

import { parseRules } from '~/services/utils';
import FormInputWrapper from '~/components/Forms/FormInputWrapper';

function replacePrefix(value, prefix) {
  let result = value;

  try {
    result = (value || '').replace(prefix, '');
  } catch (err) {
    console.log(err);
  }

  return result;
}

const TextInput = ({
  name,
  label,
  type = 'text',
  prefix = '',
  required = false,
  options,
  inputProps = {},
  readonly = false,
}) => {
  const [field, , helpers] = useField({ name });
  const cleanValue = replacePrefix(field.value, prefix);
  const rules = parseRules(options);

  const minLength = rules?.min?.limit || undefined;
  const maxLength = rules?.max?.limit || undefined;

  return (
    <FormInputWrapper label={label} options={options} readonly={readonly}>
      <InputGroup>
        {prefix && <InputGroup.Addon>{prefix}</InputGroup.Addon>}
        <Input
          type={type}
          value={cleanValue}
          onChange={val => helpers.setValue(prefix + val)}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          disabled={readonly}
          {...inputProps}
        />
      </InputGroup>
    </FormInputWrapper>
  );
};

export const URLInput = props => <TextInput type="url" {...props} />;

export const EMailInput = props => <TextInput type="email" {...props} />;

export const PasswordInput = props => <TextInput type="password" {...props} />;

export const PhoneNumberInput = props => (
  <TextInput
    prefix="+49 (0)"
    type="tel"
    {...props}
    inputProps={{ pattern: '[0-9]*' }}
  />
);

export default TextInput;
