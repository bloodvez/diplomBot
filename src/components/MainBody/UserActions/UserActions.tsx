import React from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { ActionsWrapper, MainBodyWrapper } from "../components";
import MenuHeader from "../MenuHeader";
import { SendMessageToUsers } from "./SendMessageToUsers";
import { ExchangeExperience } from "./ExchangeExperience";
import { RefreshToken } from "./RefreshToken";
import { TrashContext } from "../../..";

export const UserActions = () => {
  const trash = React.useContext(TrashContext);

  React.useEffect(() => {
    trash.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Sidebar />
      <MainBodyWrapper>
        <MenuHeader text="Действия" />
        <ExchangeExperience />
        <ActionsWrapper>
          <RefreshToken />
          {trash.role === "ADMIN" && <SendMessageToUsers />}
        </ActionsWrapper>
      </MainBodyWrapper>
    </>
  );
};
