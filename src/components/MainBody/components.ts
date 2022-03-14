import styled from "styled-components";

const bgColor = "#3c3c3c";
const bgColorHover = "#5e5e5e";

export const MainBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto;
`;

export const Header = styled.div`
  background-color: ${bgColor};
  text-align: center;
  text-decoration: none;
  font-size: 3vh;
  color: white;
  font-weight: 500;
`;

export const VolumeSliderInput = styled.input`
  -webkit-appearance: none;
  appearance: none;
  height: 25px;
  background: #d3d3d3;
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
    background: ${bgColor};
    cursor: pointer;
`;
