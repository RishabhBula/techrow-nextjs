/* eslint-disable react/prop-types */
/*
 * Collection of form fields
 * With some validations over these fields
 */
import React from "react";
import { Form } from "react-bootstrap";
// import DatePicker from 'react-datepicker'

const InputBox = ({
  type,
  value,
  label,
  disabled,
  width,
  autoComplete,
  name,
  placeholder,
  onChange,
  errorMessage,
  onBlur,
  maxLength,
  className,
  loading,
  icon,
}) => {
  return (
    <React.Fragment>
      <Form.Control
        error={errorMessage ? "true" : "false"}
        label={label || null}
        placeholder={placeholder || ""}
        type={type === "password" ? "password" : "text"}
        name={name}
        width={width || null}
        disabled={disabled || false}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        value={value}
        maxLength={maxLength}
        autoComplete={autoComplete || "new-password"}
        className={className ? className : ""}
        loading={loading || "false"}
      />
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </React.Fragment>
  );
};
export { InputBox };
