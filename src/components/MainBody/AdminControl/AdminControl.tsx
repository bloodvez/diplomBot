import React from "react";
import { useNavigate } from "react-router-dom";
import { TrashContext } from "../../..";
import Sidebar from "../../Sidebar/Sidebar";
import { MainBodyWrapper } from "../components";
import { MenuHeader } from "../components";
import { AdminUserList } from "./AdminUserList";

function AdminControl() {
  const navigate = useNavigate();
  const trash = React.useContext(TrashContext);
  React.useEffect(() => {
    if (trash.role !== "ADMIN") {
      navigate("/", { replace: true });
      return
    }
    trash.fetchlistOfUsers()
  }, []);
  return (
    <>
      <Sidebar />
      <MainBodyWrapper>
        <MenuHeader>Пользователи</MenuHeader>
        <AdminUserList />
      </MainBodyWrapper>
    </>
  );
}

export default AdminControl;
