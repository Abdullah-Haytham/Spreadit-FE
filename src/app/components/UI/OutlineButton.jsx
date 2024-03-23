import React from "react";
import styles from "./OutlineButton.module.css";

function OutlineButton({ children, isDisabled, btnClick }) {
  return (
    <div>
      <button
        type="button"
        tabIndex="0"
        className={`${styles.buttonBorder} ${styles.buttonText} ${styles.buttonColor}`}
        onClick={btnClick}
        disabled={isDisabled}
      >
        {children}
      </button>
    </div>
  );
}

export default OutlineButton;
