import styled from "styled-components";
import { BG_COLOR, BG_COLOR_HOVER, LIGHT_GRAY } from "../../constants";

export const MainBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto;
`;

export const Header = styled.div`
  background-color: ${BG_COLOR};
  width: 100%;
  text-align: center;
  text-decoration: none;
  font-size: 3vh;
  color: white;
  font-weight: 500;
`;

export const VolumeSliderInput = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 25px;
  background: ${LIGHT_GRAY};
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;

  :hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    background: ${BG_COLOR};
    cursor: pointer;
`;

export const MainBodyItemWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 0.5vh;
`;

export const MainBodyItemButton = styled.button`
background-color: ${BG_COLOR};
border: none;
color: white;
padding: 8px 24px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
cursor: pointer;
:hover {
  transition: 0.2s;
  background-color: ${BG_COLOR_HOVER};
}
`;

export const ControlsButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;