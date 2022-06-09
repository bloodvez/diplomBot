import { observer } from "mobx-react-lite";
import React from "react";
import { TrashContext } from "../..";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { listStyle, Logo, SidebarWrapper } from "./components";
import { useNavigate } from "react-router-dom";

const Sidebar = observer(() => {
  const trash = React.useContext(TrashContext);
  const navigate = useNavigate();

  return (
    <SidebarWrapper>
      <Logo src={trash.profilePictureBlob}/>
      <List sx={listStyle}>
        <ListItem button>
          <ListItemText
            primary="Пользователь"
            onClick={() => {
              navigate("/", { replace: true });
            }}
          />
        </ListItem>
        <Divider />
        <ListItem button divider>
          <ListItemText
            primary="Действия"
            onClick={() => {
              navigate("/actions", { replace: true });
            }}
          />
        </ListItem>
        {trash.role === "ADMIN" && (
          <ListItem button>
            <ListItemText
              primary="Админ"
              onClick={() => {
                navigate("/admin", { replace: true });
              }}
            />
          </ListItem>
        )}
      </List>
    </SidebarWrapper>
  );
});

export default Sidebar;
