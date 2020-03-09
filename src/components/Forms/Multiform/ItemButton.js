import React, { useState } from 'react';
import { IconButton, Icon } from 'rsuite';

import { parseSchema } from '~/services/utils';
import Modal from './Modal';

export default ({ value, options, onSave, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const isEditMode = value !== null;
  const schema = options.items?.[0];
  const [formConfig, formData] = parseSchema(schema, value);

  const onSubmit = item => {
    setShowModal(false);
    onSave(item);
  };

  const onRemove = () => {
    setShowModal(false);
    onDelete();
  };

  return (
    <div style={{ marginTop: 15 }}>
      {showModal && (
        <Modal
          title={isEditMode ? 'Bearbeiten' : 'Anlegen'}
          formData={formData}
          formConfig={formConfig}
          closeModal={() => setShowModal(false)}
          isEditMode={isEditMode}
          onSubmit={onSubmit}
          onDelete={onRemove}
        />
      )}
      <IconButton
        style={{ marginRight: 10 }}
        icon={<Icon icon={isEditMode ? 'pencil' : 'plus'} />}
        appearance="primary"
        onClick={() => setShowModal(true)}
      />
    </div>
  );
};
