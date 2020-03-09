import React from 'react';
import { CheckTreePicker } from 'rsuite';
import { useField } from 'formik';

import FormInputWrapper from '~/components/Forms/FormInputWrapper';
import useApi from '~/hooks/useApi';

const parseTags = data => {
  if (!data || !data.data) {
    return [];
  }
  return data.data.filter(tag => tag.children && tag.children.length > 0);
};

const MultiTagChooser = ({
  label,
  name,
  options,
  isSingle = false,
  readonly,
}) => {
  const relationName = options.items?.[0]?.metas?.[0]?._mongoose?.ref || 'tags';
  const [field, , helpers] = useField({ name });
  const { data } = useApi(`/${relationName}`, { params: { limit: 0 } });

  const tags = parseTags(data);

  const value =
    typeof field.value === 'string' ? [field.value] : field.value || [];

  const handleSelect = selectedTag => {
    if (isSingle) {
      return helpers.setValue(selectedTag.check ? selectedTag._id : '');
    }

    let nextValue = value.slice(0);

    if (selectedTag.check) {
      nextValue.push(selectedTag._id);
      if (selectedTag.parent) {
        nextValue.push(selectedTag.parent);
      }
    } else {
      nextValue = nextValue.filter(id => id !== selectedTag._id);
    }

    return helpers.setValue([...new Set(nextValue)]);
  };

  const handleClear = () => {
    helpers.setValue(isSingle ? '' : []);
  };

  return (
    <FormInputWrapper label={label} options={options}>
      <CheckTreePicker
        defaultExpandAll
        cascade={false}
        onSelect={handleSelect}
        onClean={handleClear}
        value={value}
        data={tags}
        valueKey="_id"
        labelKey="name"
        countable={false}
        disabled={readonly}
      />
    </FormInputWrapper>
  );
};

export default MultiTagChooser;
