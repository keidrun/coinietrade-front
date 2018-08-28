import React from 'react';
import styled from 'styled-components';

const StyledErrorBar = styled.div`
  height: 30px;
  font-size: 1.5rem;
  color: white;
  background-color: #ff6666;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorBar = ({ errorMessage }) => {
  return <StyledErrorBar>Error: {errorMessage}</StyledErrorBar>;
};

export default ErrorBar;
