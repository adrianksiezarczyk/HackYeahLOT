import React from 'react';
import styled from 'styled-components';

const StyledSelectButton = styled.button`
  background: ${props => (props.active ? 'red' : 'blue')};
`;

const SelectButton = props => {
  return (
    <StyledSelectButton
      active={props.active}
      onClick={props.handleClick}
      value={props.value}>
      {props.children}
    </StyledSelectButton>
  );
};

export default SelectButton;
