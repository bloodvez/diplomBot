import React from "react";
import { useNavigate } from "react-router-dom";
import { TrashContext } from "../..";
import Sidebar from "../Sidebar/Sidebar";
import { MainBodyWrapper } from "./components";

function AdminControl() {
  const navigate = useNavigate();
  const trash = React.useContext(TrashContext);
  React.useEffect(() => {
      console.log(trash.role);
      
    if (trash.role !== "ADMIN") {
      navigate("/", { replace: true });
    }
  });
  return (
    <>
      <Sidebar />
      <MainBodyWrapper>
      </MainBodyWrapper>
    </>
  );
}

export default AdminControl;
