import React from 'react';

export default ({
  justifyContent = 'unset',
  alignItems = 'unset',
  flexDirection = 'unset',
  style = {},
  children,
}) => {
  const flexStyles = {
    display: 'flex',
    justifyContent,
    alignItems,
    flexDirection,
    ...style,
  };

  return <div style={flexStyles}>{children}</div>;
};
