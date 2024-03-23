"use client";

import React, { useState, useEffect } from "react";
import handler from "../../utils/apiHandler";
import ProfileName from "./Profile_name";
import ProfileAbout from "./Profile_about";
import ProfileSocial from "./Profile_social";
import ProfileAdvanced from "./Profile_advanced";
import ProfileImages from "./Profile_images";
import SettingItem from "../../components/UI/SettingItem";
import SettingsLayout from "../SettingsLayout";
import optionData from "../options";

const API_URL = "/settings/profile/";
const DEBOUNCE_DELAY = 1500;
const MAX_SOCIAL_LINKS = 5;

function Profile() {
  const [nsfwProfile, setNsfwProfile] = useState(false);
  const [allowFollow, setAllowFollow] = useState(false);
  const [contentVisibility, setContentVisibility] = useState(false);
  const [activeVisibility, setActiveVisibility] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [about, setAbout] = useState("");
  const [socialLinks, setSocialLinks] = useState([]);
  const [counter, setCounter] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [clearHistory, setClearHistory] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch user preferences
        const prefsData = await handler(API_URL, "GET");
        setNsfwProfile(prefsData.nsfw);
        setAllowFollow(prefsData.allowFollow);
        setContentVisibility(prefsData.contentVisibility);
        setActiveVisibility(prefsData.activeInCommunityVisibility);
        setDisplayName(prefsData.displayName);
        setAbout(prefsData.about);
        setAvatarUrl(prefsData.profilePicture);
        setBannerUrl(prefsData.banner);
        setSocialLinks(prefsData.socialLinks); // Assuming sociallinks is the array containing social links
        setClearHistory(prefsData.clearHistory);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error (e.g., show error message, retry mechanism)
      } finally {
        setLoading(false); // Set loading state to false regardless of success or error
      }
    }
    fetchData();
  }, []);

  async function patchData() {
    const newPrefsData = {
      nsfw: nsfwProfile,
      allowFollow,
      contentVisibility,
      activeInCommunityVisibility: activeVisibility,
      displayName,
      about,
      profilePicture: avatarUrl,
      banner: bannerUrl,
      socialLinks,
      clearHistory,
    };

    try {
      // Fetch user preferences
      const prefsData = await handler(API_URL, "PATCH", newPrefsData);
      console.log(prefsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error (e.g., show error message, retry mechanism)
    }
  }

  useEffect(() => {
    if (!loading) patchData();
  }, [
    nsfwProfile,
    allowFollow,
    contentVisibility,
    activeVisibility,
    avatarUrl,
    bannerUrl,
    socialLinks,
    clearHistory,
  ]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (!loading) patchData();
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(delay);
  }, [about, displayName]); // Only trigger when about or displayName changes

  // State to track if gray overlay is on
  const [isOpen, setIsOpen] = useState(false);

  const handleAPIput = (id, status) => {
    if (id === 13) setNsfwProfile(status);
    else if (id === 14) setAllowFollow(status);
    else if (id === 15) setContentVisibility(status);
    else if (id === 16) setActiveVisibility(status);
    else if (id === 17) setClearHistory(true);
  };

  const handleOverlay = () => {
    setIsOpen(!isOpen); // Toggle the isOpen state
  };

  const handleItemClick = (id, status) => {
    console.log(`SettingItem with ID ${id} clicked. ${status}`);
    handleAPIput(id, status);
    if (id === 1 && status === false) {
      handleLockComponent(2, true);
      console.log("locked");
    } else if (id === 1 && status === true) {
      handleLockComponent(2, false);
      console.log("unlocked");
    }
  };

  useEffect(() => {
    if (clearHistory) {
      console.log("History cleared");
      setClearHistory(false);
    }
  }, [clearHistory]);

  const handleLinkSelection = (id) => {
    console.log(`Link with ID ${id} clicked.`);
  };

  const addSocialLink = (id, name, url, logo) => {
    if (counter < MAX_SOCIAL_LINKS) {
      // Spread the existing socialLinks array and add the new object to it
      setSocialLinks([...socialLinks, { id, name, url, logo }]);
      setCounter(counter + 1);
    }
  };

  const deleteSocialLink = (id) => {
    const updatedSocialLinks = socialLinks.filter((link) => link.id !== id);
    setSocialLinks(updatedSocialLinks);
    setCounter(counter - 1);
  };

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
    13: nsfwProfile,
    14: allowFollow,
    15: contentVisibility,
    16: activeVisibility,
  };

  return (
    <div className="settings--page">
      <SettingsLayout index={1} />
      <div className="settings--container">
        <div className="settings--content">
          <h2 className="settings--h2">Customize profile</h2>
          <h3 className="uppercase-h3-description">Profile Information</h3>
          <ProfileName
            displayName={displayName}
            setDisplayName={setDisplayName}
            handleSubmit={patchData}
          />
          <ProfileAbout
            about={about}
            setAbout={setAbout}
            handleSubmit={patchData}
          />
          <ProfileSocial
            isOpen={isOpen}
            onClose={handleOverlay}
            onSelectSocial={handleLinkSelection}
            addSocialLink={addSocialLink}
            deleteSocialLink={deleteSocialLink}
            socialLinks={socialLinks}
            counter={counter}
          />
          <h3 className="uppercase-h3-description">Images</h3>
          <ProfileImages
            setAvatarUrl={setAvatarUrl}
            setBannerUrl={setBannerUrl}
          />
          <h3 className="uppercase-h3-description">Profile Category</h3>
          {optionData.map(
            (option) =>
              option.id === 13 && (
                <SettingItem
                  key={option.id}
                  option={option}
                  isToggled={nsfwProfile}
                  onItemClick={handleItemClick}
                />
              )
          )}
          <h3 className="uppercase-h3-description">Advanced</h3>

          <ProfileAdvanced
            clickEvent={handleItemClick}
            array={initialStateArray}
          />
          <h3 className="uppercase-h3-description">Profile Moderation</h3>
          <div />
          <div>
            For moderation tools please visit our{" "}
            <a href="/moderation">Profile Moderation page</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
