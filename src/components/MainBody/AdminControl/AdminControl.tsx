import React from "react";
import { useNavigate } from "react-router-dom";
import { TrashContext } from "../../..";
import Sidebar from "../../Sidebar/Sidebar";
import { MainBodyWrapper } from "../components";
import { AdminUserList } from "./AdminUserList";
import MenuHeader from "../MenuHeader";

export function AdminControl() {
  const navigate = useNavigate();
  const trash = React.useContext(TrashContext);
  React.useEffect(() => {
    if (trash.role !== "ADMIN") {
      navigate("/", { replace: true });
      return;
    }
  });
  return (
    <>
      <Sidebar />
      <MainBodyWrapper>
        <MenuHeader text="Пользователи"/>
        <AdminUserList />
      </MainBodyWrapper>
    </>
  );
}