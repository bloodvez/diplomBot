import React from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { ActionsWrapper, MainBodyWrapper } from "../components";
import MenuHeader from "../MenuHeader";
import { SendMessageToUsers } from "./SendMessageToUsers";
import { RefreshToken } from "./RefreshToken";
import { TrashContext } from "../../..";

export const UserActions = () => {
  const trash = React.useContext(TrashContext);

  return (
    <>
      <Sidebar />
      <MainBodyWrapper>
        <MenuHeader text="Действия" />
        <ActionsWrapper>
          <RefreshToken />
          {trash.role === "ADMIN" && <SendMessageToUsers />}
        </ActionsWrapper>
      </MainBodyWrapper>
    </>
  );
};
