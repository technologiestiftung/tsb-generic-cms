import React from 'react';
import * as df from 'date-fns';
import { DatePicker } from 'rsuite';
import { useField } from 'formik';

import FormInputWrapper from '~/components/Forms/FormInputWrapper';

const DateTimePicker = ({ label, name, options, readonly }) => {
  const [field, , helpers] = useField({ name });
  const yesterday = df.subDays(new Date(), 1);

  return (
    <FormInputWrapper label={label} options={options}>
      <DatePicker
        disabledDate={date => df.isBefore(date, yesterday)}
        format="DD.MM.YYYY HH:mm"
        value={field.value}
        onChange={val => helpers.setValue(val)}
        disabled={readonly}
      />
    </FormInputWrapper>
  );
};

export default DateTimePicker;
