import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface ActionCardProp {
    commandName: string;
    description?: string;
    children?: JSX.Element;
  }

export function ActionCard(props:ActionCardProp) {

  return (
    <Card style={{'overflow': 'visible'}}>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {props.commandName}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {props.description}
      </Typography>
      {props.children}
    </CardContent>
  </Card>
  );
}