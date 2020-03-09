import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import { useField } from 'formik';
import lodashGet from 'lodash.get';

import { get } from '~/services/DataApi';
import FormInputWrapper from '~/components/Forms/FormInputWrapper';

const customSelectStyles = {
  menu: provided => ({
    ...provided,
    zIndex: 10,
  }),
};

const MultiRelationChooser = ({ label, name, options, readonly }) => {
  const props = options.metas?.[0];
  const apiProps = options.items?.[0]?.metas?.[0];
  const relation = apiProps?._mongoose?.ref;
  const labelKey = props?.labelKey || 'general.title';

  const [field, , helpers] = useField({ name });
  const [defaultValue, setDefaultValue] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (field.value) {
        const defaultItems = field.value.length
          ? await get(
              `/${relation}?fields=["${labelKey}"]&ids=${JSON.stringify(
                field.value
              )}`
            )
          : [];
        setDefaultValue(
          (defaultItems.data || []).map(field => ({
            value: field._id,
            label: lodashGet(field, labelKey),
          }))
        );
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
    const fieldsParam = [labelKey];

    const result = await get(
      `/${relation}?q=${encodeURIComponent(
        inputValue
      )}&limit=3&fields=${JSON.stringify(fieldsParam)}`
    );
    return result.data.map(d => {
      return {
        value: d._id,
        label: lodashGet(d, labelKey),
      };
    });
  };

  const handleChange = selectedOptions => {
    helpers.setValue((selectedOptions || []).map(option => option.value));
  };

  return (
    <FormInputWrapper style={{ zIndex: 10 }} label={label} options={options}>
      <AsyncSelect
        cacheOptions
        isMulti
        loadOptions={loadOptions}
        onChange={handleChange}
        defaultValue={defaultValue}
        placeholder="Suchen ..."
        styles={customSelectStyles}
        openMenuOnClick={false}
        openMenuOnFocus={false}
        defaultOptions
        isDisabled={readonly}
      />
    </FormInputWrapper>
  );
};

export default MultiRelationChooser;
