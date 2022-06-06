import { observer } from "mobx-react-lite";
import React from "react";
import { TrashContext } from "../..";
import { Logo, SidebarWrapper } from "./components";
import {
  AdminButton,
  UserActionsButton,
  UserInfoButton,
} from "./SidebarButtons";

const Sidebar = observer(() => {
  const trash = React.useContext(TrashContext);

  return (
    <SidebarWrapper>
      <Logo src={trash.profilePictureBlob} />
      <UserInfoButton text="Пользователь" />
      <UserActionsButton text="Действия" />
      {trash.role === "ADMIN" && <AdminButton text="Админ" />}
    </SidebarWrapper>
  );
});

export default Sidebar;
