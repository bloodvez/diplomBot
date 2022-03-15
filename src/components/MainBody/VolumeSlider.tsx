import { observer } from "mobx-react-lite";
import React from "react";
import { TrashContext } from "../..";
import {
  Header,
  VolumeSliderInput,
  MainBodyItemWrapper,
  MainBodyItemButton,
} from "./components";

const VolumeSlider = observer(() => {
  const trash = React.useContext(TrashContext);

  const onClick = () => {
    console.log(trash?.volume);
  };

  return (
    <MainBodyItemWrapper>
      <Header>Volume</Header>
      <VolumeSliderInput
        type={"range"}
        value={trash?.volume}
        onChange={(e) => {
          trash?.setVolume(parseInt(e.target.value));
        }}
      />
      <p>Volume: {trash?.volume}</p>
      <MainBodyItemButton onClick={onClick}>Set Volume</MainBodyItemButton>
    </MainBodyItemWrapper>
  );
});

export default VolumeSlider;
