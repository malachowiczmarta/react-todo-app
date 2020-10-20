import React from "react";
import "./Button.css";

function Button({ label, type, callbackFn, size, variant }) {
  let color;
  let paddingY;
  let paddingX;

  if (size === 2) {
    paddingY = 2;
    paddingX = 4;
  } else if (size === 3) {
    paddingY = 3;
    paddingX = 5;
  }

  if (variant === "delete") {
    color = "red";
  } else if (variant === "add") {
    color = "green";
  } else if (variant === "edit") {
    color = "blue";
  }

  return (
    <div className="md:flex md:items-center">
      <div className="md:w-1/3"></div>
      <div className="md:w-2/3">
        <button
          className={`shadow bg-${color}-500 hover:bg-${color}-400 focus:shadow-outline focus:outline-none text-white font-bold py-${paddingY} px-${paddingX} rounded-full`}
          type={type}
          onClick={callbackFn}
        >
          {label}
        </button>
      </div>
    </div>
  );
}

export default Button;
