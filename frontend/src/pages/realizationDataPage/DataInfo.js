import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import { formatDate, parseDate } from 'react-day-picker/moment';
import { Row, Form } from 'react-bootstrap';

const DataInfo = () => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [twoWayDirection, setTwoWayDirection] = useState(false);

  const toRef = useRef(null);

  const showFromMonth = () => {
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      toRef.current.getDayPicker().showMonth(from);
    }
  };

  const handleFromChange = _from => setFrom(_from);
  const handleToChange = _to => {
    setTo(_to);
    showFromMonth();
  };

  const modifiers = { start: from, end: to };

  return (
    <Form.Group>
      <Form.Label sm={2}>Data wylotu</Form.Label>
      <div>
        <DayPickerInput
          value={from}
          placeholder='From'
          format='LL'
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: { after: to },
            toMonth: to,
            modifiers,
            numberOfMonths: 2,
            onDayClick: () => {
              if (twoWayDirection) toRef.current.getInput().focus();
            }
          }}
          onDayChange={handleFromChange}
        />
      </div>
      <Form.Group>
        <Form.Check
          id='oneWayDirectionCheckbox'
          label='W dwie strony'
          value={twoWayDirection}
          onClick={e => {
            setTwoWayDirection(e.target.checked);
          }}
        />
      </Form.Group>
      <div>
        {twoWayDirection && (
          <DayPickerInput
            ref={toRef}
            value={to}
            placeholder='To'
            format='LL'
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { before: from },
              modifiers,
              month: from,
              fromMonth: from,
              numberOfMonths: 2
            }}
            onDayChange={handleToChange}
          />
        )}
      </div>
    </Form.Group>
  );
};

export default DataInfo;
