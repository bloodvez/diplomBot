import styled from "@emotion/styled";
import { BG_COLOR, BG_COLOR_HOVER, LIGHT_GRAY } from "../../constants";

export const listStyle = {
  width: "100%",
  maxWidth: 360,
  color: 'white'
};

export const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 1 10vw;
  align-items: center;
  background-color: ${BG_COLOR};
`;

export const Logo = styled.img`
  margin: 1vh;
  border-radius: 50%;
  border: solid;
  border-width: 3px;
  height: 10vw;
  width: 10vw;
`;

export const SidebarButton = styled.button`
  background-color: ${BG_COLOR};
  border: none;
  color: white;
  width: 100%;
  padding: 0.5vh 1.5vw;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 2vh;
  cursor: pointer;
  :hover {
    transition: 0.2s;
    background-color: ${BG_COLOR_HOVER};
  }
`;

export const TimeSliderInput = styled.input`
-webkit-appearance: none;
appearance:none;
  width: 100%;
  height: 25px;
  background: ${LIGHT_GRAY};
  outline: none;
  background-image: linear-gradient(${BG_COLOR}, ${BG_COLOR_HOVER});
  background-size: 0% 100%;
  background-repeat: no-repeat;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 25px;
    width: 5px;
    background-color: rgba(0, 0, 0, 0.3);
`;
