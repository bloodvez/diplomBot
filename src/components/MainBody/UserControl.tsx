import React from "react";
import { observer } from "mobx-react-lite";
import { TrashContext } from "../..";
import Loading from "../Loading/Loading";

const UserControl = observer(() => {
  const trash = React.useContext(TrashContext);
  React.useEffect(() => {
    trash.fetchUserData();
  }, [trash]);

  return (
    <>
      {trash.userState === "LOADING" && <Loading />}
      {trash.userState === "NORMAL_RESPONSE" && <>{trash.text}</>}
      {trash.userState === "ERROR" && <>{"Error"}</>}
    </>
  );
});

export default UserControl;
