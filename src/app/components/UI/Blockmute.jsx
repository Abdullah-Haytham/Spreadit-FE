import React, { useState } from "react";
import styles from "./Blockmute.module.css";

function Blockmute(onAdd, type, description, inputmsg) {
  const [name, setname] = useState("");
  const [inputValue, setInputValue] = useState("");
  const clearInput = () => {
    setInputValue("");
  };
  const handlenameChange = (event) => {
    setInputValue(event.target.value);
    setname(event.target.value);
  };
  const handleAdd = (event) => {
    event.preventDefault();
    clearInput();
    if (name !== "") {
      onAdd(name);
    }
  };
  const isButtonDisabled = name === "";

  return (
    <div className={styles.smallcontainer}>
      <p className={styles.subsectiontitle}>{type}</p>
      <p className={styles.description}>{description}</p>
      <div className={styles.addboxcontainer}>
        <div className={styles.inputwrap}>
          <input
            className={styles.inputbox}
            required
            value={inputValue}
            placeholder=" "
            onChange={handlenameChange}
          />
          <label htmlFor="">{inputmsg}</label>
        </div>
        <button
          type="button"
          className={styles.addbutton}
          disabled={isButtonDisabled}
          onClick={handleAdd}
        >
          ADD
        </button>
      </div>
    </div>
  );
}

export default Blockmute;
