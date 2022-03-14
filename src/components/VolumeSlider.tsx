import React, { useState } from "react";
import { Header, VolumeSliderInput } from "./components";

function VolumeSlider() {
  const [volume, setVolume] = useState(50);
  return (
    <>
      <Header>Volume</Header>
      <VolumeSliderInput
        type={"range"}
        value={volume}
        onChange={(e) => {setVolume(parseInt(e.target.value));
        }}
      />
      <p>Volume: {volume}</p>
      <button>Set Volume</button>
    </>
  );
}

export default VolumeSlider;
