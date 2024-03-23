import React from "react";
import "./Create.css";

export default function CreateLeftHeader() {
  return (
    <div className="createLeftFlexHeader">
      <div className="createLeftFlexHeaderTitle">Create a post</div>
      <button
        type="button"
        className="createLeftFlexHeaderButton create--buttonStyle create--buttonContent create--buttonColor"
      >
        Drafts
        <span className="createLeftFlexHeaderCounter">0</span>
      </button>
    </div>
  );
}
