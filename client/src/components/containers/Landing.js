import React from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import RaisedButton from 'material-ui/RaisedButton';

const loginButtonStyles = {
  button: {
    margin: 12,
    width: 300,
    height: 50,
  },
};

const LandingWrapper = styled.div`
  height: 80vh;
  background-color: #000;
  background-image: url('/assets/coinietrade-hero.jpg');
  background-size: cover;
  background-attachment: fixed;
  background-position: center center;

  h2 {
    margin-top: 5%;
    color: white;
    font-weight: 700;
    font-size: 6rem;
    text-align: center;
  }

  p {
    margin-top: 20px;
    color: white;
    font-weight: 700;
    font-size: 3rem;
    text-align: center;
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: 'wrap';
  justify-content: center;
  box-sizing: border-box;
  align-items: center;
  flex-direction: column;
`;

const StyledLoginArea = styled.div`
  margin-top: 20px;
  height: 300px;
  width: 500px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);

  h3 {
    margin-top: 50px;
    color: white;
    font-weight: 400;
    font-size: 1.7rem;
  }

  p {
    margin-top: 10px;
    color: white;
    font-weight: 700;
    font-size: 1.5rem;
  }

  a {
    color: white;
    font-weight: 700;
    font-size: 1.5rem;
    text-decoration: underline;
  }
`;

const StyledLoginButtonArea = styled.div`
  margin-top: 20px;

  span {
    color: white;
    font-size: 3rem;
  }
`;

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  height: 10vh;
  width: 100%;
  color: white;
  font-size: 2rem;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: white;
    font-size: 4rem;
  }

  span:hover {
    color: lightgray;
  }
`;

const Landing = () => (
  <LandingWrapper>
    <FlexWrapper>
      <h2>Welcome to CoinieTrade !</h2>
      <p>
        Bitcoin monitaring and trading site
        <br /> through other exchange sites.
      </p>
      <StyledLoginArea>
        <h3>Are you interested in Bitcoin? Sign up now!</h3>
        <StyledLoginButtonArea>
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
        </StyledLoginButtonArea>
        <p>
          If you'd like to know this site in detail in advance, read{' '}
          <a
            href="https://docs.coinietrade.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            documents
          </a>
          .
        </p>
      </StyledLoginArea>

      <StyledFooter>
        &copy; 2018 Keisuke Sasaki.&nbsp;&nbsp;&nbsp;&nbsp;Please send your
        feedback to &nbsp;&nbsp;
        <a href="mailto:feedback@coinietrade.com?subject=[FEEDBACK]">
          <FontAwesome name="fas fa-envelope fa-2x" />
        </a>
      </StyledFooter>
    </FlexWrapper>
  </LandingWrapper>
);

export default Landing;
