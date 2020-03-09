import React from 'react';
import * as ReactQuill from 'react-quill'; // Typescript
import cx from 'classnames';
import { useField } from 'formik';

import FormInputWrapper from '~/components/Forms/FormInputWrapper';

import 'react-quill/dist/quill.snow.css'; // ES6

const modules = {
  toolbar: [['bold', 'italic'], ['link']],
};

const readonlyModules = {
  toolbar: [],
};

const RichTextArea = ({ label, name, options, readonly }) => {
  const [field, , helpers] = useField({ name });
  const classNames = cx({ readonly });

  return (
    <FormInputWrapper label={label} options={options}>
      <ReactQuill
        value={field.value || field.text || ''}
        onChange={content => helpers.setValue(content)}
        modules={readonly ? readonlyModules : modules}
        readOnly={readonly}
        className={classNames}
      />
    </FormInputWrapper>
  );
};

export default RichTextArea;
