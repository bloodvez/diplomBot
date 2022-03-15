import React from "react";
import { MainBodyWrapper } from "./components";
import Controls from "./Controls";
import VolumeSlider from "./VolumeSlider";

function MainBody() {
  return (
    <MainBodyWrapper>
      <VolumeSlider />
      <Controls></Controls>
    </MainBodyWrapper>
  );
}

export default MainBody;
