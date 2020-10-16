import React from "react";
import "./Input.css";

function Input({
  label,
  id,
  name,
  type = "text",
  placeholder,
  validationError,
}) {
  return (
    <>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input
        className="input"
        name={name}
        placeholder={placeholder}
        type={type}
        id={id}
      ></input>
      {validationError && (
        <p className="label label-error">{validationError}</p>
      )}
    </>
  );
}

export default Input;
