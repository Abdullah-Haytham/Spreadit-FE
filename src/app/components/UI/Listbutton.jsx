import React, { useState, useRef, useEffect } from "react";
import Styles from "./Listbutton.module.css";

function Changegendercountry({
  initialv,
  choose,
  type,
  description,
  displayedColor,
  list,
}) {
  const [showList, setShowList] = useState(false);

  const [selectedItem, setSelectedItem] = useState(initialv);

  const ref = useRef(null);

  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        setShowList(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    choose(item);
    setShowList(false);
    choose(item);
  };

  return (
    <div className={Styles.smallcontainer}>
      <div className={Styles.changecontainer}>
        <div className={Styles.text}>
          <h3 className={Styles.subsectiontitle}>{type}</h3>
          <p className={Styles.description}>{description}</p>
        </div>
        <div className={Styles.list}>
          <button
            type="button"
            className={`${Styles.openlistbutton} ${displayedColor === "blue" ? Styles.blueButton : Styles.greyButton}`}
            onClick={() => setShowList(!showList)}
          >
            {selectedItem}
          </button>
          {showList && (
            <ul className={Styles.unorderedlist} ref={ref}>
              {list.map((item, index) => (
                <li
                  className={`${Styles.listitem} ${selectedItem === item ? Styles.selected : ""}`}
                  key={index}
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Changegendercountry;
