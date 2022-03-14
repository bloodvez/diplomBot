import { observer } from "mobx-react-lite";
import React from "react";
import { TrashContext } from "../..";
import { Header, VolumeSliderInput } from "./components";

const VolumeSlider = observer(() => {
  const trash = React.useContext(TrashContext);

  const onClick = () => {
    console.log(trash?.volume);
  };

  return (
    <>
      <Header>Volume</Header>
      <VolumeSliderInput
        type={"range"}
        value={trash?.volume}
        onChange={(e) => {
          trash?.setVolume(parseInt(e.target.value));
        }}
      />
      <p>Volume: {trash?.volume}</p>
      <button onClick={onClick}>Set Volume</button>
    </>
  );
});

export default VolumeSlider;
