import React from 'react';
import styles from './Help.css';

const TAG = '0.1.0';

const Help = () => (
  <div className={styles.help}>
    <h2>Help</h2>
    <div className={styles.flex_wrapper}>
      <div className={styles.content}>
        <h4>Auther</h4>
        <p>
          <a
            href="https://github.com/keidrun"
            target="_blank"
            rel="noopener noreferrer"
          >
            Keisuke Sasaki
          </a>{' '}
          (GitHub profile)
        </p>
        <p />
        <h4>Version</h4>
        <p>{TAG}</p>
        <h4>Documents</h4>
        <p>
          <a
            href="https://docs.coinietrade.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            CoinieTrade Documents
          </a>
        </p>
        <h4>Feedback</h4>
        <p>I really need your feedback to make this site much better.</p>
        <p>
          Please send your email to{' '}
          <a href="mailto:feedback@coinietrade.com?subject=[FEEDBACK]">HERE</a>!
        </p>
      </div>
    </div>
  </div>
);

export default Help;
