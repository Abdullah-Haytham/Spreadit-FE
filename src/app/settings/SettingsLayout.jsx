"use client";

// components/Layout.js
import React, { useMemo } from "react";
import Bar from "../components/UI/Bar";
import styles from "./SettingsLayout.module.css";

const Layout = ({ index }) => {
  const layout = useMemo(
    () => (
      <>
        <div className={styles.title}>User settings</div>
        <Bar selected={index} />
      </>
    ),
    [index]
  );

  return layout;
};

export default Layout;
