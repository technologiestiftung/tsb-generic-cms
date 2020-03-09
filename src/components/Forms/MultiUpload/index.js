import React from 'react';
import { useField, useFormikContext, FieldArray } from 'formik';

import Upload from '~/components/Forms/Upload';
import FormInputWrapper from '~/components/Forms/FormInputWrapper';

const MultiUpload = ({ name, label, options, readonly }) => {
  const [field] = useField({ name });
  const { submitForm } = useFormikContext();
  const maxFields = options?.rules?.[0]?.args?.limit || 1;
  const { value = [] } = field;

  return (
    <FormInputWrapper label={label} options={options} readonly={readonly}>
      <FieldArray
        name={name}
        render={arrayHelpers => {
          const onUploadComplete = (body, index) => {
            arrayHelpers.replace(index, body._id);
            submitForm();
          };

          const onUploadCompleteNewItem = body => {
            arrayHelpers.push(body._id);
            submitForm();
          };

          const onDelete = index => {
            arrayHelpers.remove(index);
            submitForm();
          };

          return (
            <>
              {value.map((v, index) => (
                <Upload
                  label={label}
                  onDelete={() => onDelete(index)}
                  onUploadComplete={body => onUploadComplete(body, index)}
                  options={options}
                  value={v}
                  key={`upload__${v}`}
                />
              ))}
              {value.length < maxFields && !readonly && (
                <Upload
                  label={label}
                  onDelete={() => {}}
                  onUploadComplete={onUploadCompleteNewItem}
                  options={options}
                  value={null}
                />
              )}
            </>
          );
        }}
      />
    </FormInputWrapper>
  );
};

export default MultiUpload;
