/* eslint-disable react-hooks/exhaustive-deps, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */

import React, { useState, useEffect } from 'react';
import { IconButton, Icon } from 'rsuite';

import UploadModal from './UploadModal';
import Flex from '~/components/Flex';

const Upload = ({
  label,
  options,
  value,
  onDelete,
  onUploadComplete,
  readonly,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({});
  const formData =
    !data._id || data.statusCode === 404
      ? { source: '', description: '' }
      : { source: data.source, description: data.description };
  const title = data.url ? `${label} bearbeiten` : `${label} hochladen`;

  const updateData = async () => {
    let nextData = {};

    if (value) {
      const response = await fetch(`${config.api.files}/${value}`);
      nextData = await response.json();
    }

    setData(nextData);
  };

  const onUpdateComplete = () => updateData();

  useEffect(() => {
    updateData();
  }, [value]);

  return (
    <>
      {showModal && (
        <UploadModal
          title={title}
          formData={formData}
          data={data}
          options={options}
          imageId={value}
          onDelete={onDelete}
          onUpdateComplete={onUpdateComplete}
          onUploadComplete={onUploadComplete}
          closeModal={() => setShowModal(false)}
        />
      )}
      <div>
        <Flex flexDirection="column">
          {data.url ? (
            <>
              <img
                src={data.url}
                alt={data.filename}
                style={{ cursor: 'pointer', width: 100, margin: '10px 0' }}
                onClick={() => setShowModal(true)}
              />
              <div style={{ fontSize: 12, color: 'gray' }}>
                Zum bearbeiten auf das Bild klicken
              </div>
            </>
          ) : (
            <div
              style={{ marginTop: 15, display: readonly ? 'none' : 'block' }}
            >
              <IconButton
                icon={<Icon icon="plus" />}
                appearance="primary"
                onClick={() => setShowModal(true)}
              />
            </div>
          )}
        </Flex>
      </div>
    </>
  );
};

export default Upload;
