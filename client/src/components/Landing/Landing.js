import React from 'react';
import styles from './Landing.css';
import FontAwesome from 'react-fontawesome';
import RaisedButton from 'material-ui/RaisedButton';

const loginButtonStyles = {
  button: {
    margin: 12,
    width: 300,
    height: 50
  }
};

const Landing = () => (
  <div className={styles.hero}>
    <div className={styles.flex_wrapper}>
      <h2>Welcome to CoinieTrade !</h2>
      <p>
        Bitcoin monitaring and trading site<br /> through other exchange sites.
      </p>
      <div className={styles.login_form}>
        <h3>Are you interested in Bitcoin? Sign up now!</h3>
        <div className={styles.button_area}>
          <RaisedButton
            href="/auth/facebook"
            label="Sign up with Facebook"
            secondary={true}
            style={loginButtonStyles.button}
            icon={<FontAwesome name="fab fa-facebook fa-2x" />}
          />
          <RaisedButton
            href="/auth/google"
            label="Sign up with Google"
            secondary={true}
            style={loginButtonStyles.button}
            icon={<FontAwesome name="fab fa-google fa-2x" />}
          />
        </div>
      </div>

      <footer className={styles.footer}>
        &copy; 2018 Keisuke Sasaki.&nbsp;&nbsp;&nbsp;&nbsp;Please send your
        feedback to &nbsp;&nbsp;<a href="mailto:coinietradefeedback@gmail.com?subject=[FEEDBACK]">
          <FontAwesome name="fas fa-envelope fa-2x" />
        </a>
      </footer>
    </div>
  </div>
);

export default Landing;
