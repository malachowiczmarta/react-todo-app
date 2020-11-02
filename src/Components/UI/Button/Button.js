import React from "react";
import "./Button.css";

function Button({ label, type, callbackFn, variant, priority }) {
  let style = "mouse transition ease-in duration-200 focus:outline-none ";

  if (variant === "delete" || variant === "edit" || variant === "check") {
    style =
      style + "bg-transparent rounded-full p-0 w-10 h-10 hover:bg-gray-300";
  } else if (variant === "add") {
    style =
      style +
      "bg-green-400 box-border py-3 w-full mb-4 rounded hover:bg-green-600";
  } else if (variant === "cancel") {
    style =
      style +
      "bg-orange-400 box-border py-3 w-full mb-4 rounded hover:bg-orange-600";
  }

  if (priority === 1) {
    style = style + " mr-2 box-border border-4 border-red-300";
  } else if (priority === 2) {
    style = style + " mr-2 box-border border-4 border-purple-300";
  } else if (priority === 3) {
    style = style + " mr-2 box-border border-4 border-blue-300";
  }

  return (
    <button className={style} type={type} onClick={callbackFn}>
      {label}
    </button>
  );
}

export default Button;
