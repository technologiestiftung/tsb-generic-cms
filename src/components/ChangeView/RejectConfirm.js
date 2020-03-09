import React from 'react';
import { Modal, Button, ButtonToolbar } from 'rsuite';
import { Formik, Form } from 'formik';

import TextAreaInput from '~/components/Forms/TextAreaInput';

const RejectConfirm = ({ onClose, onConfirm, isVisible }) => {
  const inititalValues = { message: 'Änderung wurde abgelehnt.' };

  return (
    <Modal
      onClick={evt => evt.stopPropagation()}
      show={isVisible}
      onHide={onClose}
    >
      <Modal.Header>
        <Modal.Title>Ablehnen bestätigen</Modal.Title>
      </Modal.Header>
      <Formik onSubmit={onConfirm} initialValues={inititalValues}>
        <Form>
          <Modal.Body>
            <TextAreaInput name="message" label="Ablehnungsgrund" />
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button onClick={() => onClose()}>Abbrechen</Button>
              <Button color="red" type="submit">
                Änderung Ablehnen
              </Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Form>
      </Formik>
    </Modal>
  );
};

export default RejectConfirm;
