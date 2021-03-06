import React from "react";

function Modal({ children }) {
  return (
    <div className="fixed top-0 bg-white bg-opacity-75 h-screen w-screen flex items-center justify-center">
      {children}
    </div>
  );
}

export default Modal;
