import React from "react";
import Styles from "./Changebutton.module.css";

function Changeemailpassword({ activate, type, description, display }) {
  return (
    <div className={Styles.smallcontainer}>
      <div className={Styles.changecontainer}>
        <h3 className={Styles.subsectiontitle}>{type}</h3>
        <button
          type="button"
          className={Styles.brightbutton}
          onClick={() => {
            activate();
          }}
        >
          {display}
        </button>
      </div>
      <p className={Styles.description}>{description}</p>
    </div>
  );
}
export default Changeemailpassword;
