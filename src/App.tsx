import { observer } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";
import MainBody from "./components/MainBody/MainBody";
import Sidebar from "./components/Sidebar/Sidebar";

const Root = styled.div`
display: flex;
justify-content: center;
width: auto
position: absolute;
background-color: white;
min-width: 65vw;
`;

const App = observer(() => {
  return (
    <Root>
      <Sidebar />
      <MainBody />
    </Root>
  );
});

export default App;
