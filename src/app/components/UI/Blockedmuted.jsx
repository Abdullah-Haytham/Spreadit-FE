import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";
import Image from "next/image";
import pathPP1 from "../../assets/PP1.png";
import pathPP2 from "../../assets/PP2.png";
import styles from "./Blockedmuted.module.css";

function Blockedmuted({ profilename, onRemove, path }) {
  const removeProfile = () => {
    onRemove(profilename);
  };
  return (
    <div className={styles.smallcontainer}>
      <div className={styles.removecontainer}>
        <div
          className={styles.smallprofile}
          onClick={() => alert("redirect me to this profile")}
        >
          <Image
            className={styles.smallprofilepicture}
            src={path === 1 ? pathPP1 : pathPP2}
            alt=""
          />
          <p className={styles.profilename}>{profilename}</p>
        </div>
        <button
          type="button"
          className={styles.removebutton}
          onClick={removeProfile}
        >
          REMOVE
        </button>
      </div>
    </div>
  );
}

export default Blockedmuted;
