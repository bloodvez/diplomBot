import { observer } from "mobx-react-lite";
import React from "react";
import { TrashContext } from "../..";
import Loading from "../Loading/Loading";
import Sidebar from "../Sidebar/Sidebar";
import { MainBodyWrapper } from "./components";

const UserInfo = observer(() => {
  const trash = React.useContext(TrashContext);
  return (
    <>
      <Sidebar />
      <MainBodyWrapper>
        {trash.userState === "LOADING" && <Loading />}
        {trash.userState === "NORMAL_RESPONSE" && (
          <>
            <h1>{`Name: ${trash.name}`}</h1>
            <h2>{`exp: ${trash.exp}`}</h2>
          </>
        )}
        {trash.userState === "ERROR" && <>{"Error"}</>}
      </MainBodyWrapper>
    </>
  );
});

export default UserInfo;
