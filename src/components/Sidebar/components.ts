import styled from "styled-components";

const bgColor = "#3c3c3c";
const bgColorHover = "#5e5e5e";

export const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 256px;
  background-color: ${bgColor};
`;

export const Logo = styled.img`
  border-radius: 50%;
  border: solid;
  border-width: 5px;
`;

export const SidebarButton = styled.button`
  background-color: ${bgColor};
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
    background-color: ${bgColorHover};
  }
`;