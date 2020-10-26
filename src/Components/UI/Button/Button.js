import React from "react";
import "./Button.css";

function Button({ label, type, callbackFn, variant, priority }) {
  let style;

  if (variant === "delete" || variant === "edit" || variant === "check") {
    style =
      "bg-transparent rounded-full p-0 w-10 h-10 hover:bg-black mouse transition ease-in duration-200 focus:outline-none";
  } else if (variant === "add") {
    style =
      "bg-green-400 box-border py-3 w-full rounded hover:bg-green-600 mouse transition ease-in duration-200 focus:outline-none";
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
