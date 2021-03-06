import React from "react";

function Select({ label, id, value }) {
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
        <select
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id={id}
          defaultValue={value}
        >
          <option value="1">ASAP!!!</option>
          <option value="2">Do it today</option>
          <option value="3">When you have free time</option>
        </select>
      </div>
    </div>
  );
}

export default Select;
