import React from "react";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import MainBody from "./components/MainBody";

const Root = styled.div`
display: flex;
width: auto
position: absolute;
background-color: white;
min-width: 65vw;
`;

function App() {
  return (
    <Root>
      <Sidebar />
      <MainBody />
    </Root>
  );
}

export default App;
