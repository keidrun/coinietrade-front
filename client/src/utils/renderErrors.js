import React from 'react';
import ErrorBar from '../components/common/ErrorBar';

export const renderErrors = error => {
  if (error.errors) {
    return error.errors.map((error, index) => {
      return <ErrorBar key={index} errorMessage={error.message} />;
    });
  } else {
    return <ErrorBar errorMessage={error.message} />;
  }
};
