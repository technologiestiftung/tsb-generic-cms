import React from 'react';
import { Modal, Button } from 'rsuite';
import { Formik, Form } from 'formik';

import FormFields from '~/components/Forms';

export default ({
  title,
  closeModal,
  formData,
  formConfig,
  onSubmit,
  onDelete,
  isEditMode,
  isLoading = false,
}) => {
  return (
    <Modal onClick={evt => evt.stopPropagation()} show onHide={closeModal}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik initialValues={formData} onSubmit={onSubmit}>
          <Form>
            <FormFields schema={formConfig} />

            <div style={{ marginTop: 15 }}>
              <Button appearance="primary" type="submit" loading={isLoading}>
                Speichern
              </Button>
              <Button appearance="subtle" onClick={closeModal}>
                Abbrechen
              </Button>
              {isEditMode && (
                <Button
                  appearance="subtle"
                  color="red"
                  onClick={() => onDelete()}
                >
                  Löschen
                </Button>
              )}
            </div>
          </Form>
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
