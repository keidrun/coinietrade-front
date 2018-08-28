import styled, { keyframes } from 'styled-components';

const animateColors = keyframes`
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
`;

const Body = styled.div`
  /* main area without header */
  min-height: calc(100vh - 80px);
  /* background color */
  background: linear-gradient(270deg, #e8e417, #f3ce90);
  background-size: 400% 400%;
  animation: ${animateColors} 30s ease infinite;
`;

export default Body;
