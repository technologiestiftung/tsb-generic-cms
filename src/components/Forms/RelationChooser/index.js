import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import { useField } from 'formik';
import lodashGet from 'lodash.get';

import { get } from '~/services/DataApi';
import FormInputLabel from '~/components/Forms/FormInputLabel';

const RelationChooser = ({ label, name, options, readonly }) => {
  const apiProps = options.metas?.[0];
  const relation = apiProps?._mongoose?.ref;
  const labelKey = apiProps?.labelKey || 'general.title';

  const [field, , helpers] = useField({ name });
  const [defaultValue, setDefaultValue] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (field.value) {
        const initialValue = await get(
          `/${relation}/${field.value}?fields=["${labelKey}"]`
        );
        setDefaultValue({
          value: field.value,
          label: lodashGet(initialValue, labelKey),
        });
        setLoading(false);
      } else {
        setLoading(false);
      }
    })();
  }, [field.value, labelKey, relation]);

  if (!relation || isLoading) {
    return null;
  }

  const loadOptions = async inputValue => {
    if (inputValue.length < 3) {
      return [];
    }

    const result = await get(
      `/${relation}?q=${encodeURIComponent(inputValue)}&fields=["${labelKey}"]`
    );
    return result.data.map(d => {
      return {
        value: d._id,
        label: lodashGet(d, labelKey),
      };
    });
  };

  const handleChange = option => {
    helpers.setValue(option.value);
  };

  return (
    <div style={{ position: 'relative', zIndex: 10 }}>
      <FormInputLabel label={label} options={options} />
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        onChange={handleChange}
        defaultValue={defaultValue}
        placeholder="Suchen ..."
        isDisabled={readonly}
      />
    </div>
  );
};

export default RelationChooser;
