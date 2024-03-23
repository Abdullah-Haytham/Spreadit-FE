import React from "react";
import Image from "next/image";
import sideArt from "../../assets/reddit-side-art.png";

function SideArt({ className }) {
  return (
    <div className="PageColumn__left">
      <Image className={`art ${className}`} src={sideArt} />
    </div>
  );
}
export default SideArt;
