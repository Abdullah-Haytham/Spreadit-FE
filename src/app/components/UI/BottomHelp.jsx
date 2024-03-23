import React from "react";
import Link from "next/link";

function BottomHelp({ children }) {
  return (
    <>
      {children || (
        <div className="bottom-text">
          Don't have an email or need assistance logging in?
          <Link
            href="https://www.reddit.com/wiki/index/"
            className="bottom-link"
          >
            {" "}
            get help
          </Link>
        </div>
      )}

      <div className="bottom-text">
        <Link href="./login" className="bottom-link">
          Log in
        </Link>
        <span className="link-separator">•</span>
        <Link href="./signup" className="bottom-link">
          sign up
        </Link>
      </div>
    </>
  );
}

export default BottomHelp;
