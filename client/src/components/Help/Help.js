import React from 'react';
import { Link } from 'react-router-dom';
import { TAG } from '../../utils';

import styles from './Help.css';

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
        <h4>Privacy Policy & Terms Of Service</h4>
        <p>
          <Link to={`/privacy`}>Privacy Policy</Link>
        </p>
        <p>
          <Link to={`/terms`}>Terms Of Service</Link>
        </p>
        <h4>Support</h4>
        <p>
          If you have any quiestions about this site, please send your email to{' '}
          <a href="mailto:support@coinietrade.com?subject=[SUPPORT]">HERE</a>!
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
