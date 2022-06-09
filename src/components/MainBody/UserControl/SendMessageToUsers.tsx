import React from "react";
import { ActionCard } from "./ActionCard";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export function SendMessageToUsers() {
  const [text, setText] = React.useState<string>("");
  const [textError, setTextError] = React.useState<boolean>(false);
  const [helperText, sethelperText] = React.useState<string>("");

  const handleTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (textError === true) {
      setTextError(!textError);
    }
    sethelperText("");
    setText(e.target.value);
  };

  const handleClick = () => {
    if (text === "") {
      sethelperText("Введите текст сообщения");
      setTextError(true);
      return;
    }
    console.log(text);
  };

  return (
    <ActionCard commandName="Send Message to users">
      <Stack spacing={2}>
        <TextField
          required
          error={textError}
          label="Текст сообщения"
          value={text}
          onChange={handleTextChange}
          helperText={helperText}
        />
        <Button variant="contained" color="success" onClick={handleClick}>
          Send
        </Button>
      </Stack>
    </ActionCard>
  );
}
