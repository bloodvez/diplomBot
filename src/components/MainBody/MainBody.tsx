import React from "react";
import { MainBodyWrapper } from "./components";
import Controls from "./Controls";
import VideosQueue from "./VideosQueue/VideosQueue";
import VolumeSlider from "./VolumeSlider";

function MainBody() {
  return (
    <MainBodyWrapper>
      <VolumeSlider />
      <Controls />
      <VideosQueue />
    </MainBodyWrapper>
  );
}

export default MainBody;
