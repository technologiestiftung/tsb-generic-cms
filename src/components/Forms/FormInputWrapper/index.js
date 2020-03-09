import React from 'react';
import styled from 'styled-components';

import FormInputLabel from '~/components/Forms/FormInputLabel';
import FormInputError from '~/components/Forms/FormInputError';

const FormInputWrapper = styled.div`
  margin-top: 15px;
  pointer-events: ${p => (p.readonly ? 'none' : 'all')};

  .rs-input[disabled] {
    color: #111;
  }

  .rs-checkbox-disabled > .rs-checkbox-checker > label {
    color: #111;
  }

  .rs-picker-disabled {
    opacity: 1;
  }

  .rs-picker-tag-wrapper {
    min-height: 34px;
  }

  .quill.readonly {
    .ql-toolbar {
      display: none;
    }
    .ql-container.ql-snow.ql-disabled {
      background-color: #f7f7fa;
      border: 1px solid #e5e5ea;
      border-radius: 6px;
      color: #111;
    }
  }
`;

export default ({
  children,
  label,
  options,
  showLabel = true,
  error = false,
  style = {},
  readonly = false,
}) => (
  <FormInputWrapper readonly={readonly} style={style}>
    {showLabel && <FormInputLabel label={label} options={options} />}
    {error && <FormInputError error={error} />}
    {children}
  </FormInputWrapper>
);
