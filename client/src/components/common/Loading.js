import React from 'react';
import styled from 'styled-components';
import CircularProgress from 'material-ui/CircularProgress';

const LoadingWrapper = styled.div`
  padding-top: 20px;
  text-align: center;
`;

const Loading = () => (
  <LoadingWrapper>
    <CircularProgress size={180} thickness={10} color="#000000" />
  </LoadingWrapper>
);

export default Loading;
