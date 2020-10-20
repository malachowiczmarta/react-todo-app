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
    <div className="md:flex md:items-center mb-6">
      <div className="md:w-1/6">
        <label
          className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
          htmlFor={id}
        >
          {label}
        </label>
      </div>

      <div className="md:w-5/6">
        <input
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          name={name}
          placeholder={placeholder}
          type={type}
          id={id}
        ></input>
        {validationError && (
          <p className="label label-error">{validationError}</p>
        )}
      </div>
    </div>
  );
}

export default Input;
