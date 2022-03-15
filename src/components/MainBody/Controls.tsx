import { observer } from "mobx-react-lite";
import React from "react";
import { TrashContext } from "../..";
import { TimeSliderInput } from "../Sidebar/components";
import {
  ControlsButtonsWrapper,
  Header,
  MainBodyItemButton,
  MainBodyItemWrapper,
} from "./components";

const Controls = observer(() => {
  const trash = React.useContext(TrashContext);
  const refRange = React.useRef<HTMLInputElement>(null);

  if(refRange.current){
    refRange.current!.style.backgroundSize =
    `${(trash!.currentTime * 100) / 100}% 100%`;
  }

  return (
    <MainBodyItemWrapper>
      <Header>Controls</Header>
      <TimeSliderInput
        ref={refRange}
        type={"range"}
        min={0}
        max={100}
        value={trash?.currentTime}
        readOnly={true}
      ></TimeSliderInput>
      <ControlsButtonsWrapper>
        <MainBodyItemButton onClick={trash?.stop}>Stop</MainBodyItemButton>
        <MainBodyItemButton onClick={trash?.play}>Play</MainBodyItemButton>
        <MainBodyItemButton onClick={trash?.skip}>Skip</MainBodyItemButton>
      </ControlsButtonsWrapper>
    </MainBodyItemWrapper>
  );
});

export default Controls;
