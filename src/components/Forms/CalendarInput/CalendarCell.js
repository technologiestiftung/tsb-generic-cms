import React, { useState } from 'react';
import styled from 'styled-components';
import { Tag } from 'rsuite';

import EditDateModal from './EditDateModal';

const OverflowTag = styled(Tag)`
  width: 100%;
  overflow: hidden;
  border-radius: 0;

  .rs-tag-text {
    display: block;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const CalendarCell = ({ dates = [], onDelete, onChange, schema = {} }) => {
  const [editDate, setEditDate] = useState(false);

  if (!dates.length) {
    return null;
  }

  const handleClick = item => evt => {
    evt.preventDefault();
    evt.stopPropagation();
    setEditDate(item);
  };

  const finishEdit = changes => {
    onChange(changes[0]);
    setEditDate(null);
  };

  return (
    <>
      {editDate && (
        <EditDateModal
          data={editDate}
          onClose={() => setEditDate(null)}
          onFinish={finishEdit}
          onDelete={onDelete}
          schema={schema}
          title="Ändere einen bestehenden Termin"
          isEditMode
        />
      )}
      {dates.map(item => (
        <div key={item._id}>
          <OverflowTag
            alt={item?.general?.description}
            onClick={handleClick(item)}
            color="blue"
          >
            {item?.general?.description || 'date'}
          </OverflowTag>
        </div>
      ))}
    </>
  );
};

export default CalendarCell;
