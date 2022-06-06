import { observer } from "mobx-react-lite";
import React from "react";
import { useNavigate } from "react-router-dom";
import { TrashContext } from "../..";
import { Logo, SidebarButton, SidebarWrapper } from "./components";

const Sidebar = observer(() => {
  const trash = React.useContext(TrashContext);
  const navigate = useNavigate();
  return (
    <SidebarWrapper>
      <Logo src={trash.profilePictureBlob} />
      <SidebarButton
        onClick={() => {
          navigate("/", { replace: true });
        }}
      >
        User info
      </SidebarButton>
      <SidebarButton
        onClick={() => {
          navigate("/actions", { replace: true });
        }}
      >
        Actions
      </SidebarButton>
      {trash.role === "ADMIN" && (
        <SidebarButton
          onClick={() => {
            navigate("/admin", { replace: true });
          }}
        >
          Admin
        </SidebarButton>
      )}
    </SidebarWrapper>
  );
});

export default Sidebar;
