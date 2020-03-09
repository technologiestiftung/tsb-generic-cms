import React, { useState } from 'react';
import ObjectId from 'bson-objectid';
import { Calendar, Button } from 'rsuite';
import { useField, FieldArray } from 'formik';
import { min } from 'd3-array';
import * as df from 'date-fns';

import EditDateModal from './EditDateModal';
import CalendarCell from './CalendarCell';
import Flex from '~/components/Flex';
import FormInputWrapper from '~/components/Forms/FormInputWrapper';

const getCellRenderer = (data, handleChange, handleDelete, schema) => date => {
  const today = df.setHours(date, 0);
  const tomorrow = df.addDays(today, 1);
  const dates = data.filter(
    d =>
      (df.isAfter(d.date.from, today) && df.isBefore(d.date.from, tomorrow)) ||
      (df.isAfter(today, d.date.from) && df.isBefore(tomorrow, d.date.to))
  );

  return (
    <CalendarCell
      onChange={handleChange}
      onDelete={handleDelete}
      dates={dates}
      today={today}
      schema={schema}
    />
  );
};

const parseDate = dateEntry => {
  return {
    ...dateEntry,
    date: {
      from: new Date(dateEntry.date.from),
      to: new Date(dateEntry.date.to),
    },
  };
};

const createEmptyDate = date => {
  return {
    date: { from: date, to: df.addHours(date, 2) },
    general: { description: 'new date' },
    _id: ObjectId.generate(),
  };
};

const isModalOpen = () => document.querySelector('.rs-modal-wrapper');

const CalendarInput = ({ label, name, options, readonly }) => {
  const [field, , helpers] = useField({ name });
  const [addDate, setAddDate] = useState(null);

  const value = field.value || [];
  const dates = value.map(parseDate);

  const minDate = min(dates, d => d.date.from);

  const handleSelect = date => {
    if (isModalOpen()) {
      setAddDate(null);
      return false;
    }
    const emptyDate = createEmptyDate(date);
    return setAddDate(emptyDate);
  };

  const dateSchema = options.items[0];
  const dateIds = dates.map(d => d._id);

  return (
    <FieldArray
      name={name}
      render={arrayHelpers => {
        const handleChange = data => {
          const replaceIndex = dateIds.indexOf(data._id);
          arrayHelpers.replace(replaceIndex, data);
        };

        const handleDelete = data => {
          const removeIndex = dateIds.indexOf(data._id);
          arrayHelpers.remove(removeIndex);
        };

        const renderCell = getCellRenderer(
          dates,
          handleChange,
          handleDelete,
          dateSchema
        );

        const handleAddDates = newDates => {
          helpers.setValue(value.concat(newDates));
          setAddDate(null);
        };

        const deleteAll = () => helpers.setValue([]);

        return (
          <FormInputWrapper options={options} label={label} readonly={readonly}>
            {addDate && (
              <EditDateModal
                data={addDate}
                onClose={() => setAddDate(null)}
                onFinish={handleAddDates}
                schema={dateSchema}
                isEditMode={false}
              />
            )}
            <Calendar
              bordered
              onSelect={handleSelect}
              renderCell={renderCell}
              defaultValue={minDate}
              isoWeek
            />
            <Flex>
              <Button
                style={{ marginLeft: 'auto' }}
                appearance="subtle"
                color="red"
                size="sm"
                onClick={deleteAll}
              >
                Alle Termine löschen
              </Button>
            </Flex>
          </FormInputWrapper>
        );
      }}
    />
  );
};

export default CalendarInput;
