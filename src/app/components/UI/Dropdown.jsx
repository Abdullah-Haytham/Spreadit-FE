import React, { useState, useEffect, useRef } from "react";
import "./dropdown.css";
import Dropdownmenu from "./Dropdownmenu";
import DropdownItem from "./DropdownItem";

function Dropdown({ defId, selectedDropItem, pId }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown container
  const [selectedId, setSelectedId] = useState(defId); // Initial selectedId state

  const toggleMenuVisibility = () => {
    setIsMenuVisible((prevIsMenuVisible) => !prevIsMenuVisible);
  };

  const closeMenu = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsMenuVisible(false);
    }
  };

  // Add event listener when the component mounts
  useEffect(() => {
    document.addEventListener("mousedown", closeMenu);
    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  const handleSelectedIdChange = (newSelectedId) => {
    setSelectedId(newSelectedId);
    console.log(`Dropdown: ${newSelectedId}`);
    selectedDropItem(pId, newSelectedId);
    setIsMenuVisible(false);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <DropdownItem
        toggleMenu={toggleMenuVisibility}
        pId={pId}
        selectedId={selectedId}
        onSelect={handleSelectedIdChange}
      />
      <div
        ref={dropdownRef}
        style={{
          position: "absolute",
          top: "100%",
          marginLeft: "20px",
          display: isMenuVisible ? "block" : "none",
        }}
      >
        <Dropdownmenu
          pId={pId}
          selectedId={selectedId}
          onSelect={handleSelectedIdChange}
        />
      </div>
    </div>
  );
}

export default Dropdown;
