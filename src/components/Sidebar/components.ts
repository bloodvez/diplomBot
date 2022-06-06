import styled from "styled-components";
import { BG_COLOR, BG_COLOR_HOVER, LIGHT_GRAY } from "../../constants";

export const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 1 10vw;
  align-items: center;
  background-color: ${BG_COLOR};
`;

export const Logo = styled.img`
  border-radius: 50%;
  border: solid;
  border-width: 5px;
  height: 10vw;
  width: 10vw;
`;

export const SidebarButton = styled.button`
  background-color: ${BG_COLOR};
  border: none;
  color: white;
  padding: 15px 32px;
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
