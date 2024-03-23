import React from "react";
import "./Create.css";

export default function CreateLeftDropdown() {
  return (
    <div className="createLeftFlexDropdownFlexContainer createLeftFlexGroupedOptions">
      <div className="create--DropdownArea">
        <div className="create--DropdownFlex">
          <span className="create--CommunityIcon create--DropdownOptionIcon" />
          <div className="create--DropdownOptionFlex">
            <input
              className="create--DropdownOptionText"
              placeholder="Choose a community"
              spellCheck="false"
              value=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
