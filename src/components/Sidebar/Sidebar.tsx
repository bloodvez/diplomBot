import React from "react";
import { Logo, SidebarButton, SidebarWrapper } from "./components";

function Sidebar() {
  return (
    <SidebarWrapper>
        <Logo src={"/img/logo.jpg"}/>
        <SidebarButton>Button1</SidebarButton>
        <SidebarButton>Button2</SidebarButton>
        <SidebarButton>Button3</SidebarButton>
    </SidebarWrapper>
  );
}

export default Sidebar;
