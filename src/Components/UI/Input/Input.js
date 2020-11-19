import React from "react";

function Input({
  label,
  id,
  name,
  type = "text",
  value = "",
  placeholder,
  validationError,
}) {
  return (
    <div className="flex items-center mb-6">
      <div className="w-1/5">
        <label
          className="block text-gray-500 font-bold text-left mb-1 md:mb-0 pr-4"
          htmlFor={id}
        >
          {label}
        </label>
      </div>

      <div className="w-4/5">
        <input
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
          name={name}
          placeholder={placeholder}
          type={type}
          id={id}
          defaultValue={value}
        />
        {validationError && (
          <p className="label label-error">{validationError}</p>
        )}
      </div>
    </div>
  );
}

export default Input;
