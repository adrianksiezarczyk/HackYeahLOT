import React from 'react';

import { DropdownButton, Dropdown } from 'react-bootstrap';

const StyledDropdown = props => {
  return (
    <DropdownButton title={props.title}>
      {props.answers.map(answer =>
        props.id === 2 ? (
          <Dropdown.Item
            key={answer.code}
            value={answer.code}
            onClick={e => props.handleClick(e, 2)}>
            {answer.name}
          </Dropdown.Item>
        ) : (
          <Dropdown.Item
            key={answer}
            value={answer}
            onClick={e => props.handleClick(e, 1)}>
            {answer}
          </Dropdown.Item>
        )
      )}
    </DropdownButton>
  );
};

export default StyledDropdown;
