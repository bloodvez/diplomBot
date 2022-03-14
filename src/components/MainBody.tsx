import React from "react";
import { Header, MainBodyWrapper } from "./components";
import VolumeSlider from "./VolumeSlider";

function MainBody() {
  return (
    <MainBodyWrapper>
      <VolumeSlider />
      <Header>Header2</Header>
    </MainBodyWrapper>
  );
}

export default MainBody;
