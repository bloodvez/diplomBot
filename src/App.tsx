import { observer } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";
import { TrashContext } from ".";
import Loading from "./components/Loading/Loading";
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
  const trash = React.useContext(TrashContext);
  return (
    <>
      {trash?.loading && <Loading />}
      {!trash?.loading && (
        <Root>
          <Sidebar />
          <MainBody />
        </Root>
      )}
    </>
  );
});

export default App;
