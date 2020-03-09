import React from 'react';
import { useField, useFormikContext, FieldArray } from 'formik';

import FormInputWrapper from '~/components/Forms/FormInputWrapper';
import Flex from '~/components/Flex';
import ItemButton from './ItemButton';

export default ({ name, options, label, readonly }) => {
  const [field] = useField({ name });
  const { submitForm } = useFormikContext();
  const maxFields = options?.rules?.[0]?.args?.limit || 1;

  const { value = [] } = field;

  return (
    <FormInputWrapper label={label} options={options} readonly={readonly}>
      <Flex>
        <FieldArray
          name={name}
          render={arrayHelpers => {
            const onSave = (item, index) => {
              arrayHelpers.replace(index, item);
              submitForm();
            };

            const onSaveNewItem = item => {
              arrayHelpers.push(item);
              submitForm();
            };

            const onDelete = index => {
              arrayHelpers.remove(index);
              submitForm();
            };

            return (
              <>
                {value.map((value, index) => (
                  <ItemButton
                    key={`itembutton_${value._id ? value._id : index}`}
                    label={label}
                    onDelete={() => onDelete(index)}
                    onSave={item => onSave(item, index)}
                    options={options}
                    value={value}
                  />
                ))}
                {value.length < maxFields && !readonly && (
                  <ItemButton
                    label={label}
                    onDelete={() => {}}
                    onSave={onSaveNewItem}
                    options={options}
                    value={null}
                  />
                )}
              </>
            );
          }}
        />
      </Flex>
    </FormInputWrapper>
  );
};
