import React from "react";
import { ActionCard } from "./ActionCard";
import Button from "@mui/material/Button";
import { TrashContext } from "../../..";

export function RefreshToken() {
  const trash = React.useContext(TrashContext);
  return (
    <ActionCard commandName="Refresh Token">
      <Button variant="contained" color="success" onClick={trash.refreshToken}>
        Refresh
      </Button>
    </ActionCard>
  );
}
