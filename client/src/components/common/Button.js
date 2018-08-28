import React from 'react';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';

const muiStyles = {
  button: {
    width: 200,
    height: 50,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: '75%',
  },
  backButton: {
    width: 200,
    height: 50,
    marginLeft: '15%',
  },
  tableButton: {
    width: 100,
    height: 50,
    margin: 5,
  },
};

const ButtonWrapper = styled.span`
  div {
    color: white;
    font-size: 2rem;
  }
`;

const Button = ({ btnType, children, ...atrr }) => {
  let btnStyle;
  if (btnType === 'back') {
    btnStyle = muiStyles.backButton;
  } else if (btnType === 'table') {
    btnStyle = muiStyles.tableButton;
  } else {
    btnStyle = muiStyles.button;
  }

  return (
    <ButtonWrapper>
      <RaisedButton secondary={true} style={btnStyle} {...atrr}>
        {children}
      </RaisedButton>
    </ButtonWrapper>
  );
};

export default Button;
