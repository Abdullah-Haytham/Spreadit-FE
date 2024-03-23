import React, { useState, useEffect } from "react";
import styles from "./SettingItem.module.css";
import Switch from "./Switch";
import Dropdown from "./Dropdown";
import OutlineButton from "./OutlineButton";

export default function SettingItem({
  isToggled,
  prevBlur,
  onItemClick,
  option,
  isLocked,
  dropDownClick,
  defaultDropdown,
}) {
  const [isSwitchToggled, setIsSwitchToggled] = useState(isToggled);
  const [previousSwitchState, setPreviousSwitchState] = useState(prevBlur);

  const handleClick = () => {
    if (onItemClick) {
      onItemClick(option.id);
    }
  };

  const handleSwitchToggle = () => {
    setIsSwitchToggled((prevState) => !prevState);
    console.log(`Switch toggled. New state: ${!isSwitchToggled}`);
    onItemClick(option.id, !isSwitchToggled);
  };

  const handleDrop = (id, selectedId) => {
    console.log(`handleDrop: ${id} ${selectedId}`);
    dropDownClick(id, selectedId);
  };

  useEffect(() => {
    if (isLocked) {
      // If the component is being locked, store the current state of the switch toggle
      setPreviousSwitchState(isSwitchToggled);
      setIsSwitchToggled(false); // Set the switch toggle off when component is locked
    } else if (!isLocked && previousSwitchState !== undefined) {
      // If the component is being unlocked and there's a previous state recorded,
      // restore the switch toggle to its previous state
      setIsSwitchToggled(previousSwitchState);
    }
  }, [isLocked]);

  return (
    <div>
      <div className={styles.settingOption}>
        <div className={styles.settingOptionLeft}>
          <h3 className={`settings--h3 ${isLocked ? styles.grayedOut : ""}`}>
            {option.title}
          </h3>
          <p className={`settings--p ${isLocked ? styles.grayedOut : ""}`}>
            {option.description}
          </p>
        </div>
        <div className={styles.settingOptionRight}>
          <div className={styles.settingOptionRightButtonFloat}>
            {option.type === "switch" && (
              <Switch
                isToggled={isSwitchToggled}
                onToggle={handleSwitchToggle}
                disabled={isLocked}
              />
            )}
            {option.type === "dropdown" && (
              <Dropdown
                pId={option.id}
                defId={defaultDropdown}
                selectedDropItem={handleDrop}
              />
            )}
            {option.type === "button" && (
              <OutlineButton btnClick={handleClick}>
                {" "}
                {option.buttontext}{" "}
              </OutlineButton>
            )}
          </div>
        </div>
      </div>

      {option.subOptions &&
        option.subOptions.map((subOption) => (
          <div className={styles.settingSuboption}>
            <SettingItem
              key={subOption.id}
              option={subOption}
              onItemClick={onItemClick}
              dropDownClick={dropDownClick}
            />
          </div>
        ))}
    </div>
  );
}
