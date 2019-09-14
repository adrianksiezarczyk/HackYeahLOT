import React from 'react';

import { DropdownButton, Dropdown } from 'react-bootstrap';


const StyledDropdown = props => (
  <DropdownButton title={props.title}>
    {props.answers.map(answer => (
      <Dropdown.Item key={answer}>{answer}</Dropdown.Item>
    ))}
  </DropdownButton>
);

export default StyledDropdown;
