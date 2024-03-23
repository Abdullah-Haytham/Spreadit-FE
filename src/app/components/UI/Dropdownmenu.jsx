import React, { useState } from "react";
import "./dropdown.css";
import dropdownOptions from "./dropdownOptions";

function Dropdownmenu({
  closeMenu,
  pId,
  onSelect,
  selectedId: initialSelectedId,
}) {
  const [selectedId, setSelectedId] = useState(initialSelectedId);

  const handleItemClick = (selectedItemId) => {
    console.log("Dropwdownmenu: Item clicked:", selectedItemId); // Debugging
    setSelectedId(selectedItemId);
    onSelect(selectedItemId);
  };

  const renderDropdownItems = () => {
    const parentObject = dropdownOptions.find(
      (option) => option.parentId === pId
    );

    // Map over the choices array of the found object
    return (
      parentObject &&
      parentObject.choices.map((option) => (
        <button
          type="button"
          key={option.dropId}
          role="menuitem"
          className="_10K5i7NW6qcm-UoCtpB3aK _3LwUIE7yX7CZQKmD2L87vf _1oYEKCssGFjqxQ9jJMNj5G"
          onClick={() => handleItemClick(option.dropId)}
        >
          <span className="pthKOcceozMuXLYrLlbL1">{option.icon}</span>
          <span
            className={`${option.dropId === selectedId ? "blue" : "_2-cXnP74241WI7fpcpfPmg"}`}
          >
            {option.desc}
          </span>
        </button>
      ))
    );
  };

  return (
    <div className="_1VhYfuKTAdUU_3j4cMjkr5">
      <div className="menuFormat">{renderDropdownItems()}</div>
    </div>
  );
}

export default Dropdownmenu;
