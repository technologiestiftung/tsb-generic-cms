import React from 'react';
import { useField, useFormikContext } from 'formik';

import Upload from '~/components/Forms/Upload';
import FormInputWrapper from '~/components/Forms/FormInputWrapper';

const SingleUpload = ({ name, label, options, readonly }) => {
  const [field, , helpers] = useField({ name });
  const { submitForm } = useFormikContext();

  const onUploadComplete = body => {
    helpers.setValue(body._id);
    submitForm();
  };

  const onDelete = () => {
    helpers.setValue(null);
    submitForm();
  };

  return (
    <FormInputWrapper label={label} options={options} readonly={readonly}>
      <Upload
        label={label}
        onDelete={onDelete}
        onUploadComplete={onUploadComplete}
        options={options}
        value={field.value}
        readonly={readonly}
      />
    </FormInputWrapper>
  );
};

export default SingleUpload;
