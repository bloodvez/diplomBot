import React from "react";
import { observer } from "mobx-react-lite";
import { TrashContext } from "../..";
import Loading from "../Loading/Loading";

const UserControl = observer(() => {
  const trash = React.useContext(TrashContext);
  React.useEffect(() => {
    trash.fetchUserData();
  }, [trash]);

  const [text, setText] = React.useState("");

  return (
    <>
      {trash.userState === "LOADING" && <Loading />}
      {trash.userState === "NORMAL_RESPONSE" && <>{trash.text}</>}
      {trash.userState === "ERROR" && <>{"Error"}</>}
      <button onClick={() => trash.refreshToken()}>refresh</button>
      <button onClick={() => trash.fetchUserData()}>fetch</button>
      <input
        placeholder="Text"
        type="text"
        // name='uname'
        // value={uname}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button
        onClick={() => {
          trash.dispatchAction('sendMsg', {'text': text});
        }}
      >
        send
      </button>
    </>
  );
});

export default UserControl;
