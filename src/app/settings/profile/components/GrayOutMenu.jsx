import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./GrayOutMenu.module.css";
import SocialButton from "./SocialButton";
import OutlineButton from "@/app/components/UI/OutlineButton";

function GrayOutMenu({ onClose, onSelectGray , addSocial}) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isChoicesOpen, setChoicesOpen] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [socialUrl, setUrl] = useState("");

  function handleDispInputChange(event) {
    const { value } = event.target;

    setDisplayName(value);
  }

  function handleUrlInputChange(event) {
    const { value } = event.target;

    setUrl(value);
  }

  const handleToggleStates = () => {
    setDialogOpen((prevState) => !prevState);
    setChoicesOpen((prevState) => !prevState);
  };

  const handleSave = () => {
    if (displayName.trim() !== "") { // Check if displayName is not empty
      addSocial({ displayName }); // Pass an object with displayName to addSocial function
      onClose();
    }
  };

  const handleClick = (event) => {
    // Prevent clicks from propagating to elements underneath the menu
    event.stopPropagation();
  };

  const handleLinkClick = (id) => {
    handleToggleStates();
  };

  const renderDialog = () => {
    return (
      <>
        <SocialButton
          nameOption={"testst"}
          iconUrl={
            "https://www.redditstatic.com/desktop2x/img/social-links/custom.png"
          }
        />
        <div>
          <input
            placeholder="Display text"
            className={styles.txtBox}
            value={displayName}
            data-tribute="true"
            onChange={handleDispInputChange}
          />
          <input
            placeholder="insert url"
            onChange={handleUrlInputChange}
            className={styles.txtBox}
            value={socialUrl}
            data-tribute="true"
          />
        </div>
      </>
    );
  };

  const renderChoices = () => {
    return (
      <SocialButton
        choseLink={handleLinkClick}
        nameOption={"custom"}
        iconUrl={
          "https://www.redditstatic.com/desktop2x/img/social-links/custom.png"
        }
      />
    );
  };

  return (
    <div
      className={`${styles.grayOut} ${styles.menuPosition}`}
      onClick={onClose} // Close the menu when clicking on the gray area
    >
      <div
        aria-modal="true"
        className={styles.menuBox}
        role="dialog"
        tabIndex="-1"
        onClick={handleClick} // Prevent clicks from propagating to elements underneath the menu
      >
        <section className={styles.sectionSize}>
          <header className={styles.menuHeader}>
            <div className={styles.flexHeader}>
              {isDialogOpen && (
                <div className={styles.backArrow} style={{ flexBasis: "16px" }}>
                  <button onClick={handleToggleStates}>
                    <div className="color-X icon">&larr;</div>
                  </button>
                </div>
              )}
              <div className={styles.flexHeaderText}>
                <div className={styles.textHeader}>Add Social Link</div>
              </div>
              {isChoicesOpen && (
                <div className={styles.flexX} style={{ flexBasis: "16px" }}>
                  <button onClick={onClose}>
                    <div className="color-X icon">&#10006;</div>
                  </button>
                </div>
              )}
              {isDialogOpen && (
                <div className={styles.flexX} style={{ flexBasis: "16px" }}>
                  <OutlineButton children={'Save'} isDisabled={displayName === '' || socialUrl === ''} btnClick={handleSave}/>
                </div>
              )}
            </div>
          </header>
          <div className={`${styles.menuBody} ${styles.padding}`}>
            {isChoicesOpen && renderChoices()}
            {isDialogOpen && renderDialog()}
          </div>
        </section>
      </div>
    </div>
  );
}

function GrayOutMenuWrapper({ isOpen, onClose, onSelectWrapper, addFunc }) {
  useEffect(() => {
    // Disable scrolling on the body when the modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    }
  }, [isOpen]); // Only re-run the effect if isOpen changes

  if (!isOpen) return null;

  // Use ReactDOM.createPortal to render the menu outside of its parent components
  return ReactDOM.createPortal(
    <GrayOutMenu onClose={onClose} onSelectGray={onSelectWrapper} addSocial={addFunc}/>,
    document.body // Render the menu as a direct child of the document body
  );
}

export default GrayOutMenuWrapper;
