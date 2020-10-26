import React, { useState } from "react";

function Dropdown({ desc, author, url }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  Dropdown.handleClickOutside = () => setOpen(false);

  return (
    <div>
      <div role="button" onClick={() => toggle(!open)}>
        <div className="cursor-pointer text-center">
          {open ? (
            <span>{<i class="fas fa-sort-up"></i>}</span>
          ) : (
            <span>{<i class="fas fa-sort-down"></i>}</span>
          )}
        </div>
      </div>
      {open && (
        <div>
          <p>Opis: {desc}</p>
          <p>Autor: {author}</p>
          <p>Link: {url}</p>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
