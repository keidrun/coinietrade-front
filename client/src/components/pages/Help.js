import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { TAG } from '../../utils';

const HelpWrapper = styled.div`
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 40px;
  height: 100%;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: 'wrap';
  justify-content: center;
  box-sizing: border-box;
  align-items: center;
`;

const StyledContent = styled.div`
  margin-top: 20px;
  border: dashed 5px #000;
  padding: 20px;
  background-color: white;
  width: 1000px;

  h4 {
    text-align: left;
  }

  p {
    font-size: 3rem;
    margin: 20px;
  }

  a {
    font-size: 3rem;
    color: #ff4081;
  }

  a:hover {
    color: #ff80ab;
  }
`;

const Help = () => (
  <HelpWrapper>
    <h2>Help</h2>
    <FlexWrapper>
      <StyledContent>
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
      </StyledContent>
    </FlexWrapper>
  </HelpWrapper>
);

export default Help;
