import React from "react";
import { ActionCard } from "./ActionCard";
import Button from "@mui/material/Button";
import { refreshToken } from "../../../http/methods";
import { TrashContext } from "../../..";

export function RefreshToken() {
  const trash = React.useContext(TrashContext);
  const refresh = async () => {
    const token = await refreshToken();
    if (!token){
      trash.setUserState('ERROR')
      console.log('cant refresh token');
      return
    }  
    localStorage.setItem("accessToken", token);
  };

  return (
    <ActionCard commandName="Refresh Token">
      <Button variant="contained" color="success" onClick={refresh}>
        Refresh
      </Button>
    </ActionCard>
  );
}
