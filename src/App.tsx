import { observer } from "mobx-react-lite";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { TrashContext } from ".";
import LoggingIn from "./components/LoggingIn";
import AdminControl from "./components/MainBody/AdminControl/AdminControl";
import AdminUserEdit from "./components/MainBody/AdminControl/AdminUserEdit";
import UserControl from "./components/MainBody/UserControl";
import UserInfo from "./components/MainBody/UserInfo";

const Root = styled.div`
display: flex;
justify-content: center;
width: auto
position: absolute;
background-color: white;
min-width: 65vw;
height 60vh;
`;

const App = observer(() => {
  const trash = React.useContext(TrashContext);

  React.useEffect(() => {
    trash.fetchCurrentUserData();
    trash.fetchProfilePicture();
  }, [trash]);

  return (
    <BrowserRouter>
      <Root>
        <Routes>
          <Route path="/" element={<UserInfo />} />
          <Route path="actions" element={<UserControl />} />
          <Route path="admin/" element={<AdminControl />}/>
          <Route path="admin/:id" element={<AdminUserEdit />}/>
          <Route path="login" element={<LoggingIn />} />
        </Routes>
      </Root>
    </BrowserRouter>
  );
});

export default App;
