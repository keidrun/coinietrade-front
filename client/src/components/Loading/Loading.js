import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const Loading = ({ style }) => (
  <div className={style}>
    <CircularProgress size={180} thickness={10} color="#000000" />
  </div>
);

export default Loading;
