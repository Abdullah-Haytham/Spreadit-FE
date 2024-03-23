import Image from "next/image";
import React from "react";
import logo from "../assets/logoSpreadIt.svg";
import "./Create.css";

export default function CreateRightRules() {
  return (
    <div>
      <div className="createRightFlexRulesBox">
        <div className="createRightFlexRulesBoxHeader">
          <Image src={logo} className="createRightFlexRulesBoxHeaderLogo" />
          Posting to Spreadit
        </div>
        <ol className="createRightFlexRulesBoxList">
          <li className="createRightFlexRulesBoxBullets">Remember the human</li>
          <li className="createRightFlexRulesBoxBullets">
            Behave like you would in real life
          </li>
          <li className="createRightFlexRulesBoxBullets">
            Look for the original source of content
          </li>
          <li className="createRightFlexRulesBoxBullets">
            Search for duplicates before posting
          </li>
          <li className="createRightFlexRulesBoxBullets">
            Read the community’s rules
          </li>
        </ol>
      </div>
      <div className="createRightFlexFooter">
        Please be mindful of Spreadit's{" "}
        <a href="https://www.reddit.com/help/contentpolicy">content policy</a>{" "}
        and practice good{" "}
        <a href="https://www.reddit.com/wiki/reddiquette">Spreadiquette</a>.
      </div>
    </div>
  );
}
