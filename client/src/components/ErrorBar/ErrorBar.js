import React from 'react';
import styles from './ErrorBar.css';

const ErrorBar = ({ errorMessage }) => {
  return <div className={styles.error}>Error: {errorMessage}</div>;
};

export default ErrorBar;
