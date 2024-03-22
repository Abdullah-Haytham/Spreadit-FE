import React, { useState } from "react";
import FormInfo from "../components/form/FormInfo.jsx";
import BlueButton from "../components/UI/BlueButton.jsx";
import BottomHelp from "../components/UI/BottomHelp.jsx";
import submitToApi from "../utils/submitToApi.js";

function RecoverUsername() {
  const url = "http://localhost:3002/forgot-username";
  const [email, setEmail] = useState("");

  function handleInputChange(event) {
    const { value } = event.target;
    console.log(value);
    setEmail(value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { email };
    const response = await submitToApi(url, "POST", data);
    console.log(response);
    setEmail("");
  };

  return (
    <div className="pageColumn__right">
      <div className="userFormContainer">
        <FormInfo
          title="Recover your username"
          description="Tell us the email address associated with your Reddit account, and we'll send you an email with your username."
        />
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <input
              className="form-input"
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleInputChange}
              value={email}
            />
          </div>
          <BlueButton>Email Me</BlueButton>
        </form>
        <BottomHelp />
      </div>
    </div>
  );
}

export default RecoverUsername;
