import React from "react";
import styles from "./GrayButton.module.css";

function GrayButton({ children, wasClicked, isDisabled }) {
  return (
    <>
      {isDisabled && (
        <li className={styles.buttonroundd} tabIndex="0" type="button">
          <i className="icon">&#43;</i>
          {children}
        </li>
      )}

      {!isDisabled && (
        <li
          className={styles.buttonround}
          onClick={wasClicked}
          tabIndex="0"
          role="button"
        >
          <i className="icon">&#43;</i>
          {children}
        </li>
      )}
    </>
  );
}

export default GrayButton;
