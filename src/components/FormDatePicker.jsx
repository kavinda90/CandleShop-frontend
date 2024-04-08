import React, { useState } from "react";
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { FaCalendarDays } from "react-icons/fa6";

import "react-datepicker/dist/react-datepicker.css";

import "react-datepicker/dist/react-datepicker-cssmodules.css";

const FormDatePicker = ({ name, label }) => {
  const [startDate, setStartDate] = useState(new Date("05 October 2010 14:48 UTC"));
  return (
    <Form.Group controlId={name} className="d-flex flex-column align-items-center">
      <Form.Label className="me-2">
        <span className="capitalize">{label}</span>
      </Form.Label>
      <DatePicker
        showIcon
        icon={<FaCalendarDays className="mt-1" />}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        className="form-control text-lg" // Adjusted to use Bootstrap's 'form-control' class
        id={name}
        name={name}
      />
    </Form.Group>
  );
};

export default FormDatePicker;
