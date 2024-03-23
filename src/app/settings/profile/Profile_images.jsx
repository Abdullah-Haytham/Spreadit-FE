import React from "react";
import "./Profile.css";
import AvatarArea from "./profile_images/AvatarArea";
import BannerArea from "./profile_images/BannerArea";

export default function ProfileImages({ setAvatarUrl, setBannerUrl }) {
  return (
    <div>
      <div className="settings--flex">
        <div className="settings--flexheader">
          <h3 className="settings--h3">Avatar and banner image</h3>
          <p className="settings--p ">Images must be .png or .jpg format</p>
        </div>
        <div className="settings--flexoption">
          <div className="profile--images-flexdrag">
            <AvatarArea setAvatarUrl={setAvatarUrl} />
            <BannerArea setBannerUrl={setBannerUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}
