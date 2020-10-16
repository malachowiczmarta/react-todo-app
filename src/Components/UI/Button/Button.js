import React from "react";
import "./Button.css";

function Button({ label, type, callbackFn, size, variant }) {
  let btnClassName = "btn";

  if (size === 2) {
    btnClassName = btnClassName + " btn-large";
  } else if (size === 3) {
    btnClassName = btnClassName + " btn-xlarge";
  }

  if (variant === "delete") {
    btnClassName = btnClassName + " btn-delete";
  } else if (variant === "add") {
    btnClassName = btnClassName + " btn-add";
  }

  return (
    <button className={btnClassName} type={type} onClick={callbackFn}>
      {label}
    </button>
  );
}

export default Button;
