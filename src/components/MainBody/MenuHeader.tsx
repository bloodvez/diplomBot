import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { MenuHeaderWrapper } from "./components";

interface HeaderProp {
  text: string;
  children?: JSX.Element;
}

function MenuHeader(props: HeaderProp) {
  return (
    <MenuHeaderWrapper>
      <Toolbar>
        {props.children}
        <Typography variant="h6">{props.text}</Typography>
      </Toolbar>
    </MenuHeaderWrapper>
  );
}

export default MenuHeader;
