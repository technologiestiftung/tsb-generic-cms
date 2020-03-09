import React from 'react';
import styled from 'styled-components';

const ErrorMessage = styled.div`
  color: #f66;
`;

const FormInputError = ({ error = '' }) => {
  return <ErrorMessage>{error}</ErrorMessage>;
};

export default FormInputError;
