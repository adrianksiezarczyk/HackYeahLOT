import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import { formatDate, parseDate } from 'react-day-picker/moment';
import { Form } from 'react-bootstrap';

const Content = styled.div`
  border-radius: 4px;
  margin-bottom: 15px;

  .form-group {
    margin-bottom: 10px;
    margin-right: 4px;
  }

  label {
    font-weight: 500;
    font-size: 16px;
    text-transform: uppercase;
    color: #083377;
    display: block;
    padding: 4px 0 5px;
    margin: 0;
    line-height: 1.2;
    margin-bottom: 5px;
    position: relative;
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }
`;
const InputStyles = styled.div`
  input {
    font-size: 1em;
    color: #434343;
    background: #fff;
    box-shadow: none;
    text-indent: 4px;
    box-sizing: border-box;
    border: 1px solid #716d6d;
    padding: 0;
    border-radius: 3px;
    font-family: inherit;
    line-height: 1;
    height: 40px;
    display: block;
    width: 100%;
    margin: 0;
    max-width: 100%;
    padding: 2px 5px;
    margin-right: 2px;
    border: 1px solid #ced4da;
  }
`;
const CheckboxStyles = styled.div`
  input {
    width: 20px;
    height: 20px;
    margin: 0 5px 0 -20px;
    line-height: 30px;
    vertical-align: middle;
    margin-bottom: 20px;
  }
  label {
    margin-left: 10px;
    font-weight: 400;
    font-size: 14px;
    position: relative;
    bottom: 3px;
  }
`;
const StyledFormGroup = styled(Form.Group)`
  margin-bottom: 20px;
  ${props =>
    props.twoWayDirection &&
    `
  display:flex;
  justify-content: space-between;
`}
`;

const DataInfo = ({ onDateChange, twoWayDirection, setTwoWayDirection }) => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  // useEffect(() => {
  //   if (from || to) onDateChange(from, to)
  // }, [from, onDateChange, to])

  const toRef = useRef(null);

  const showFromMonth = () => {
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      toRef.current.getDayPicker().showMonth(from);
    }
  };

  const handleFromChange = _from => {
    onDateChange(_from, to);
    setFrom(_from);
  };
  const handleToChange = _to => {
    onDateChange(from, _to);
    setTo(_to);
    showFromMonth();
  };

  const modifiers = { start: from, end: to };

  return (
    <Content>
      <StyledFormGroup twoWayDirection={twoWayDirection}>
        <Form.Group>
          <Form.Label sm={2}>Data wylotu</Form.Label>
          <InputStyles>
            <DayPickerInput
              value={from}
              placeholder=''
              format='LL'
              formatDate={formatDate}
              parseDate={parseDate}
              dayPickerProps={{
                selectedDays: [from, { from, to }],
                disabledDays: { after: to },
                toMonth: to,
                modifiers,
                numberOfMonths: 1,
                onDayClick: () => {
                  if (twoWayDirection) toRef.current.getInput().focus();
                }
              }}
              onDayChange={handleFromChange}
            />
          </InputStyles>
        </Form.Group>

        {twoWayDirection && (
          <Form.Group>
            <Form.Label sm={2}>Data przylotu</Form.Label>
            <InputStyles>
              <DayPickerInput
                ref={toRef}
                value={to}
                placeholder=''
                format='LL'
                formatDate={formatDate}
                parseDate={parseDate}
                dayPickerProps={{
                  selectedDays: [from, { from, to }],
                  disabledDays: { before: from },
                  modifiers,
                  month: from,
                  fromMonth: from,
                  numberOfMonths: 1
                }}
                onDayChange={handleToChange}
              />
            </InputStyles>
          </Form.Group>
        )}
      </StyledFormGroup>

      <CheckboxStyles>
        <Form.Check
          id='oneWayDirectionCheckbox'
          label='W dwie strony'
          value={twoWayDirection}
          onClick={e => {
            setTwoWayDirection(e.target.checked);
          }}
        />
      </CheckboxStyles>
    </Content>
  );
};

export default DataInfo;
