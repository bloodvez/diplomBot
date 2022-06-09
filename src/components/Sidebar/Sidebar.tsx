import { observer } from "mobx-react-lite";
import React from "react";
import { TrashContext } from "../..";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { listStyle, Logo, SidebarWrapper } from "./components";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = observer(() => {
  const trash = React.useContext(TrashContext);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [currentPath, setcurrentPath] = React.useState<string>(path);

  const navigateTo = (path: string) => {
    if (currentPath === path) return;

    setcurrentPath(path);
    navigate(`/${path}`, { replace: true });
  };

  return (
    <SidebarWrapper>
      <Logo src={trash.profilePictureBlob} />
      {trash.userState === "NORMAL_RESPONSE" && (
        <List sx={listStyle}>
          <ListItem button>
            <ListItemText
              primary="Пользователь"
              onClick={() => {
                navigateTo("");
              }}
            />
          </ListItem>
          <Divider />
          <ListItem button divider>
            <ListItemText
              primary="Действия"
              onClick={() => {
                navigateTo("actions");
              }}
            />
          </ListItem>
          {trash.role === "ADMIN" && (
            <ListItem button>
              <ListItemText
                primary="Админ"
                onClick={() => {
                  navigateTo("admin");
                }}
              />
            </ListItem>
          )}
        </List>
      )}
    </SidebarWrapper>
  );
});

export default Sidebar;
