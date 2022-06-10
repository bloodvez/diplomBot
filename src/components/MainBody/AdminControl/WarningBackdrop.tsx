import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface WarningBackdropProp {
  open: boolean;
  closeBackdrop():void;
  onAccept():void;
}

export function WarningBackdrop(props: WarningBackdropProp) {

  return (
    <Backdrop open={props.open} onClick={props.closeBackdrop}>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Вы убираете ваши права администратора.
          </Typography>
          <Typography variant="body2" color="text.secondary">
              Вы уверены?
          </Typography>
        </CardContent>
        <CardActions>
          <Button color={"error"} variant={'outlined'} onClick={() => {
              props.onAccept()
              props.closeBackdrop()
          }}>Подтвердить</Button>
        </CardActions>
      </Card>
    </Backdrop>
  );
}
