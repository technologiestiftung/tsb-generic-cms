/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Modal, Button } from 'rsuite';
import { DragDrop } from '@uppy/react';

import TextInput from '~/components/Forms/TextInput';
import { update, remove } from '~/services/DataApi';
import useUppy from './useUppy';
import { getRequestData, getMetaFields } from './utils';

import '@uppy/drag-drop/dist/style.css';

const EditDateModal = ({
  title = 'Upload an image',
  data,
  formData,
  imageId,
  options,
  onDelete,
  onUpdateComplete,
  onUploadComplete,
  closeModal,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const uppy = useUppy({
    onUploadComplete,
    closeModal,
    setIsLoading,
    setPreviewImage,
  });
  const imageType = options.metas?.[0]?.type;
  const isEditMode = typeof data.url !== 'undefined';
  const showImage = data.url || previewImage;

  if (!uppy || !formData) {
    return null;
  }

  const updateImage = async requestData => {
    await update(`/${imageId}`, requestData, config.api.files);
    setIsLoading(false);
    closeModal();
    onUpdateComplete();
  };

  const uploadImage = (formikData, requestData) => {
    const metaFields = getMetaFields(formikData);

    uppy.getPlugin('XHRUpload').setOptions({
      metaFields,
    });
    uppy.setMeta({ imageType, ...requestData });

    uppy.upload();
  };

  const onSubmit = async formikData => {
    const requestData = getRequestData(formikData);
    setIsLoading(true);

    if (isEditMode) {
      return updateImage(requestData);
    }

    return uploadImage(formikData, requestData);
  };

  const onRemove = async () => {
    await remove(`/${imageId}`, config.api.files);
    closeModal();
    onDelete();
  };

  return (
    <Modal onClick={evt => evt.stopPropagation()} show onHide={closeModal}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showImage ? (
          <img
            src={data.url || previewImage}
            alt={data.filename || 'Vorschau'}
            style={{ width: 100 }}
          />
        ) : (
          <DragDrop
            uppy={uppy}
            locale={{
              strings: {
                dropHereOr: 'Datei hier hinziehen oder %{browse}',
                browse: 'öffnen',
              },
            }}
          />
        )}
        <div style={{ marginTop: 10 }}>
          <Formik initialValues={formData} onSubmit={onSubmit}>
            <Form>
              <TextInput name="source" label="Quelle" />
              <TextInput name="description" label="Beschreibung" />

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
                    onClick={() => onRemove()}
                  >
                    Bild Löschen
                  </Button>
                )}
              </div>
            </Form>
          </Formik>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditDateModal;
