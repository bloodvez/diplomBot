import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { MainBodyWrapper } from "./components";
import UserControl from "./UserControl";
// import Controls from "./Controls";
// import VideosQueue from "./VideosQueue/VideosQueue";
// import VolumeSlider from "./VolumeSlider";

// const userStore = new UserStore();
// setTimeout(() =>{userStore.fetch()}, 1000)

function MainBody() {
  return (
    <>
      <Sidebar />
      <MainBodyWrapper>
        {/* <UserControl /> */}
        {/* <VolumeSlider />
      <Controls />
      <VideosQueue /> */}
      </MainBodyWrapper>
    </>
  );
}

export default MainBody;
