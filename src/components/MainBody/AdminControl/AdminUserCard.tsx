import React from "react";
import { IUser } from "../../../state/interfaces";
import { UserCardWrapper } from "./components";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface UserCardProp {
  user: IUser;
}

function AdminUserCard(prop: UserCardProp) {
  const navigate = useNavigate();
  return (
    <UserCardWrapper>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {prop.user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Опыт: {prop.user.exp}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Роль: {prop.user.role}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Telegram ID: {prop.user.tlgID}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              navigate(`/admin/${prop.user.tlgID}`);
            }}
          >
            Редактировать
          </Button>
        </CardActions>
      </Card>
    </UserCardWrapper>
  );
}

export default AdminUserCard;
