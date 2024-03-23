"use client";

import React, { useState, useEffect } from "react";
import SettingItem from "../../components/UI/SettingItem";
import optionData from "../options";
import handler from "../../utils/apiHandler";
import SettingsLayout from "../SettingsLayout";

const API_URL = "/settings/feed";

function Feed() {
  const [nsfw, setNsfw] = useState(false);
  const [blurNsfw, setBlurNsfw] = useState(false);
  const [homeRecommend, setHomeRecommend] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [reduceAnim, setReduceAnim] = useState(false);
  const [communityThemes, setCommunityThemes] = useState(false);
  const [contentSort, setContentSort] = useState(1);
  const [csRemember, setCSRemember] = useState(false);
  const [globalView, setGlobalView] = useState(1);
  const [gvRemember, setGVRemember] = useState(false);
  const [newTab, setNewTab] = useState(false);
  const [defMarkdown, setDefMarkdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [prevBlur, setPrevBlur] = useState(blurNsfw);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch user preferences
        const prefsData = await handler(API_URL, "GET");
        console.log(prefsData);
        setNsfw(prefsData.adultContent);
        setBlurNsfw(prefsData.blurnsfw);
        setHomeRecommend(prefsData.homerecommend);
        setAutoplay(prefsData.autoplayMedia);
        setReduceAnim(prefsData.reduceanim);
        setCommunityThemes(prefsData.communityThemes);
        setContentSort(prefsData.communityContentSort);
        setCSRemember(prefsData.csremember);
        setGlobalView(prefsData.globalContentView);
        setGVRemember(prefsData.gvremember);
        setNewTab(prefsData.openPostsInNewTab);
        setDefMarkdown(prefsData.defmarkdown);
        setPrevBlur(prefsData.prevblur);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading state to false regardless of success or error
      }
    }
    fetchData();
  }, []);

  async function patchData() {
    const newPrefsData = {
      adultContent: nsfw,
      blurnsfw: blurNsfw,
      homerecommend: homeRecommend,
      autoplayMedia: autoplay,
      reduceanim: reduceAnim,
      communityThemes,
      communityContentSort: contentSort,
      csremember: csRemember,
      globalContentView: globalView,
      gvremember: gvRemember,
      openPostsInNewTab: newTab,
      defmarkdown: defMarkdown,
      prevblur: prevBlur,
    };

    try {
      // patch user preferences
      const prefsData = await handler(API_URL, "PATCH", newPrefsData);
      console.log(prefsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    if (!loading) patchData();
  }, [
    nsfw,
    blurNsfw,
    homeRecommend,
    autoplay,
    reduceAnim,
    communityThemes,
    contentSort,
    csRemember,
    globalView,
    gvRemember,
    newTab,
    defMarkdown,
  ]);

  const [lockedComponents, setLockedComponents] = useState({});

  // Callback function to lock/unlock component
  const handleLockComponent = (id, isLocked) => {
    setLockedComponents((prevLockedComponents) => ({
      ...prevLockedComponents,
      [id]: isLocked,
    }));
  };

  const handleAPIput = (id, status) => {
    if (id === 1) setNsfw(status);
    else if (id === 2) {
      setBlurNsfw(status);
      setPrevBlur(status);
    } else if (id === 3) setHomeRecommend(status);
    else if (id === 4) setAutoplay(status);
    else if (id === 5) setReduceAnim(status);
    else if (id === 6) setCommunityThemes(status);
    else if (id === 7) setContentSort(status);
    else if (id === 8) setCSRemember(status);
    else if (id === 9) setGlobalView(status);
    else if (id === 10) setGVRemember(status);
    else if (id === 11) setNewTab(status);
    else if (id === 12) setDefMarkdown(status);
  };

  const handleItemClick = (id, status) => {
    console.log(`SettingItem with ID ${id} clicked. ${status}`);
    handleAPIput(id, status);
    if (id === 1 && status === false) {
      handleLockComponent(2, true);
      setBlurNsfw(false);
      console.log("locked");
    } else if (id === 1 && status === true) {
      handleLockComponent(2, false);
      console.log("unlocked");
    }
  };

  const handleDropdownClick = (id, selectedId) => {
    console.log(`page.js: SettingItem with ID ${id} clicked. ${selectedId}`);
    handleAPIput(id, selectedId);
  };

  useEffect(() => {
    if (!nsfw) {
      handleLockComponent(2, true);
      setBlurNsfw(false);
    } else {
      setBlurNsfw(prevBlur);
      handleLockComponent(2, false);
    }
  }, [nsfw]);

  if (loading) {
    return (
      <div className="window">
        <div className="setting--page">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  const initialStateArray = {
    1: nsfw,
    2: blurNsfw,
    3: homeRecommend,
    4: autoplay,
    5: reduceAnim,
    6: communityThemes,
    8: csRemember,
    10: gvRemember,
    11: newTab,
    12: defMarkdown,
  };

  const dropDownInitial = {
    7: contentSort,
    9: globalView,
  };

  return (
    <div className="window">
      <div className="settings--page">
        <SettingsLayout index={3} />
        <div className="settings--container">
          <div className="settings--content">
            <h2 className="settings--h2">Feed settings</h2>
            <h3 className="uppercase-h3-description">Content Preferences</h3>

            {optionData.map(
              (option) =>
                option.id < 12 && (
                  <SettingItem
                    key={option.id}
                    option={option}
                    onItemClick={handleItemClick}
                    dropDownClick={handleDropdownClick}
                    isLocked={lockedComponents[option.id]}
                    defaultDropdown={dropDownInitial[option.id]}
                    isToggled={initialStateArray[option.id]}
                    prevState={prevBlur}
                  />
                )
            )}
            <h3 className="uppercase-h3-description">Post Preferences</h3>
            {optionData.map(
              (option) =>
                option.id === 12 && (
                  <SettingItem
                    key={option.id}
                    option={option}
                    onItemClick={handleItemClick}
                    isToggled={defMarkdown}
                  />
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
