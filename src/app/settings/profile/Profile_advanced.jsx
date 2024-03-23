import React from "react";
import SettingItem from "../../components/UI/SettingItem";
import optionData from "../options";

export default function ProfileAdvanced({ clickEvent, array }) {
  return (
    <div>
      {optionData.map(
        (option) =>
          option.id < 18 &&
          option.id > 13 && (
            <SettingItem
              key={option.id}
              option={option}
              onItemClick={clickEvent}
              isToggled={array[option.id]}
            />
          )
      )}
    </div>
  );
}
