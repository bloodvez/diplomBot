import React from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { MainBodyWrapper } from "../components";
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
        <RefreshToken/>
        {trash.role === "ADMIN" && <SendMessageToUsers/>}
      </MainBodyWrapper>
    </>
  )
};
