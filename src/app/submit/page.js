"use client";

import CreateLeftHeader from "./CreateLeftHeader";
import CreateLeftDropdown from "./CreateLeftDropdown";
import CreateRightRules from "./CreateRightRules";

function Submit() {
  return (
    <main className="create">
      <div className="createMainFlex">
        <div className="createLeftFlex">
          <CreateLeftHeader />
          <CreateLeftDropdown />
          <h1 className="contentBelow"> Big textbox goes here</h1>
        </div>
        <div className="createRightFlex">
          <div className="createRightFlexPadding">
            <CreateRightRules />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Submit;
