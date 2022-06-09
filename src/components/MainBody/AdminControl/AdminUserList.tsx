import { observer } from "mobx-react-lite";
import React from "react";
import { TrashContext } from "../../..";
import { IUser } from "../../../state/interfaces";
import Loading from "../../Loading/Loading";
import AdminUserCard from "./AdminUserCard";
import { UserListWrapper } from "./components";

export const AdminUserList = observer(() => {
  const trash = React.useContext(TrashContext);
  return (
    <UserListWrapper>
      {trash.userList !== null ? (
        trash.userList.map((user: IUser) => (
          <AdminUserCard user={user} key={user.tlgID} />
        ))
      ) : (
        <Loading />
      )}
    </UserListWrapper>
  );
});
