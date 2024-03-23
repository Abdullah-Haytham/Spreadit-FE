import React from "react";
import styles from "./Switch.module.css";

export default function Toogle({
  disabled,
  optionTitle,
  optionDescription,
  onToggle,
  isToggled,
}) {
  const optionClassName = disabled ? styles.disabledOption : "";

  return (
    <div className={`${styles.option} ${optionClassName}`}>
      <div className={styles.data}>
        <h1 className={styles.optionName}>{optionTitle}</h1>
        <h2 className={styles.optionDescription}>{optionDescription}</h2>
      </div>
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={isToggled}
          onChange={onToggle}
          disabled={disabled}
        />
        <span className={styles.slider} />
      </label>
    </div>
  );
}
