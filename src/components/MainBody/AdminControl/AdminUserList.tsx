import { observer } from "mobx-react-lite";
import React from "react";
import { fetchlistOfUsers } from "../../../http/methods";
import { IUser } from "../../../state/interfaces";
import Loading from "../../Loading/Loading";
import AdminUserCard from "./AdminUserCard";
import { UserListWrapper } from "./components";

export const AdminUserList = observer(() => {
  const [userList, setUserList] = React.useState<IUser[] | null>();

  const fetchUsers = async () => {
    const users = await fetchlistOfUsers();
    if (users) setUserList(users);
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserListWrapper>
      {userList !== null ? (
        userList?.map((user: IUser) => (
          <AdminUserCard user={user} key={user.tlgID} />
        ))
      ) : (
        <Loading />
      )}
    </UserListWrapper>
  );
});
