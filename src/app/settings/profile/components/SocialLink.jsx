import React from "react";
import styles from "./SocialLink.module.css";

function SocialLink({ logo, name, wasClicked, id, isDeletor }) {
  const handleClick = () => {
    console.log(id);
    wasClicked(id);
  };

  return (
    <>
      {!isDeletor && (
        <li
          className={`${styles.buttonround} ${styles.limargin}`}
          onClick={handleClick}
          tabIndex="0"
          role="button"
        >
          <img src={logo} className={styles.iconMargin} />
          {name}
        </li>
      )}

      {isDeletor && (
        <li
          className={`${styles.buttonroundd} ${styles.limargin}`}
          onClick={handleClick}
          tabIndex="0"
          role="button"
        >
          <img src={logo} className={styles.iconMargin} />
          {name}
        </li>
      )}
    </>
  );
}

export default SocialLink;
