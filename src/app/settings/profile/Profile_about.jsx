import React from "react";
import "./Profile.css";

export default function ProfileAbout({ about, setAbout, handleSubmit }) {
  const maxChars = 200;

  function handleInputChange(event) {
    const { value } = event.target;
    if (value.length <= maxChars) {
      setAbout(value);
    }
  }

  return (
    <div>
      <div className="settings--flex">
        <div className="settings--flexheader">
          <h3 className="settings--h3">About (optional)</h3>
          <p className="settings--p">
            A brief description of yourself shown on your profile.
          </p>
        </div>
        <div className="settings--flexoption">
          <textarea
            className="profile--aboutTextBox"
            name="aboutTextbox"
            onChange={handleInputChange}
            value={about}
            maxLength={maxChars}
            placeholder="About (optional)"
          />
          <p className="textboxlettercount">
            {maxChars - about.length} Characters remaining
          </p>
        </div>
      </div>
    </div>
  );
}
