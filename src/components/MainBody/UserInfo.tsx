import { observer } from "mobx-react-lite";
import React from "react";
import { TrashContext } from "../..";
import { beautifyDate } from "../../utils";
import Loading from "../Loading/Loading";
import Sidebar from "../Sidebar/Sidebar";
import { MainBodyWrapper, MenuHeader } from "./components";

const UserInfo = observer(() => {
  const trash = React.useContext(TrashContext);
  const [timeString, settimeString] = React.useState("");
  React.useEffect(() => {
    trash.fetchCurrentUserData();
    trash.fetchProfilePicture();

    if (trash.createdAt) {
      const timeString = beautifyDate(trash.createdAt);
      settimeString(timeString);
    }
  }, [trash]);

  return (
    <>
      <Sidebar />
      <MainBodyWrapper>
        <MenuHeader>Информация о пользователе</MenuHeader>
        {trash.userState === "LOADING" && <Loading />}
        {trash.userState === "NORMAL_RESPONSE" && (
          <>
            <h1>{`Имя: ${trash.name}`}</h1>
            <h2>{`Опыт: ${trash.exp}`}</h2>
            <h2>{`Зарегестрирован: ${timeString}`}</h2>
          </>
        )}
        {trash.userState === "ERROR" && <>{"Error"}</>}
      </MainBodyWrapper>
    </>
  );
});

export default UserInfo;
