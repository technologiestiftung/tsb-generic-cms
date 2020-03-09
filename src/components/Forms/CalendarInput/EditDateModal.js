import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import {
  Modal,
  Button,
  ButtonToolbar,
  FormGroup,
  RadioGroup,
  Radio,
  DatePicker,
} from 'rsuite';
import cloneDeep from 'lodash.clonedeep';
import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  isBefore,
  isAfter,
} from 'date-fns';

import { parseSchema } from '~/services/utils';
import FormFields from '~/components/Forms';
import FormInputWrapper from '~/components/Forms/FormInputWrapper';

function getRepeatedDates(origDateData, repeatMode, repeatUntil) {
  const additionalDates = [];
  // default: daily => every day = 365 repetitions
  let maxIndex = 365;
  let dateFunction = addDays;

  if (repeatMode === 'weekly') {
    maxIndex = 52;
    dateFunction = addWeeks;
  } else if (repeatMode === 'monthly') {
    maxIndex = 12;
    dateFunction = addMonths;
  }

  let recentDate = origDateData;

  for (let index = 1; index <= maxIndex; index += 1) {
    const newDateFrom = dateFunction(recentDate.date.from, 1);
    const newDateTo = dateFunction(recentDate.date.to, 1);
    const newDate = cloneDeep(recentDate);

    newDate.date.from = newDateFrom;
    newDate.date.to = newDateTo;

    recentDate = newDate;

    if (recentDate.date.to <= repeatUntil) {
      additionalDates.push(newDate);
    }
  }

  return additionalDates;
}

const EditDateModal = ({
  onClose,
  onDelete,
  onFinish,
  data = {},
  schema = {},
  title = 'Erstelle einen neuen Termin',
  isEditMode = false,
}) => {
  const today = new Date();
  const [repeatMode, setRepeatMode] = useState('none');
  const [repeatUntil, setRepeatUntil] = useState(addYears(today, 1));
  const [formConfig, formData] = parseSchema(schema, data);
  const handleSubmit = dateData => {
    if (!isEditMode && repeatMode !== 'none') {
      const additionalDates = getRepeatedDates(
        dateData,
        repeatMode,
        repeatUntil
      );
      return onFinish([dateData, ...additionalDates]);
    }

    return onFinish([dateData]);
  };

  return (
    <Modal onClick={evt => evt.stopPropagation()} show onHide={onClose}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isEditMode && (
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontWeight: 700 }}>Termin wiederholen</div>
            <FormGroup controlId="radioList">
              <RadioGroup
                name="radioList"
                inline
                defaultValue="none"
                onChange={setRepeatMode}
              >
                <Radio value="none">Keine Wiederholung</Radio>
                <Radio value="daily">Täglich</Radio>
                <Radio value="weekly">Wöchentlich</Radio>
                <Radio value="monthly">Monatlich</Radio>
              </RadioGroup>
            </FormGroup>

            {repeatMode !== 'none' && (
              <FormInputWrapper label="Wiederholen bis (max. 1 Jahr)">
                <DatePicker
                  disabledDate={date => {
                    return (
                      isAfter(date, addYears(today, 1)) || isBefore(date, today)
                    );
                  }}
                  calendarDefaultDate={today}
                  format="DD.MM.YYYY"
                  value={repeatUntil}
                  onChange={setRepeatUntil}
                />
              </FormInputWrapper>
            )}
          </div>
        )}
        <Formik initialValues={formData} onSubmit={handleSubmit}>
          <Form>
            <FormFields schema={formConfig} />

            <ButtonToolbar>
              <Button intent="danger" onClick={() => onClose()}>
                Abbrechen
              </Button>
              <Button appearance="primary" type="submit">
                Speichern
              </Button>
              {isEditMode && (
                <Button
                  color="red"
                  intent="danger"
                  onClick={() => onDelete(data)}
                >
                  Löschen
                </Button>
              )}
            </ButtonToolbar>
          </Form>
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default EditDateModal;
