import React from "react";
import { ActionCard } from "./ActionCard";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  dispatchAction,
  fetchlistOfUsers,
  ISendMessageAction,
} from "../../../http/methods";
import { IUser } from "../../../state/interfaces";

export function SendMessageToUsers() {
  const [text, setText] = React.useState<string>("");
  const [textError, setTextError] = React.useState<boolean>(false);
  const [helperText, sethelperText] = React.useState<string>("");
  const [userList, setUserList] = React.useState<IUser[] | null>();
  const [idToSend, setIdToSend] = React.useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(false);
  const [responseStatus, setresponseStatus] = React.useState<boolean>(true);

  const fetchUsers = async () => {
    const users = await fetchlistOfUsers();
    if (users) {
      setIdToSend(users[0].tlgID);
      setUserList(users);
    }
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setIdToSend(event.target.value as string);
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const handleTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (textError === true) {
      setTextError(!textError);
    }
    sethelperText("");
    setText(e.target.value);
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleClick = async () => {
    if (text === "") {
      sethelperText("Введите текст сообщения");
      setTextError(true);
      return;
    }
    const actionToSend: ISendMessageAction = {
      actionType: "SEND_MESSAGE",
      payload: {
        tlgID: idToSend,
        text: text,
      },
    };
    const result = await dispatchAction(actionToSend);

    if (result === false) {
      setresponseStatus(false)
      setSnackbarOpen(true)
      return
    }
    setresponseStatus(true)
    setSnackbarOpen(true)
  };

  return (
    <ActionCard commandName="Отправить сообщение пользователю">
      <Stack spacing={2}>
        <TextField
          required
          error={textError}
          label="Текст сообщения"
          value={text}
          onChange={handleTextChange}
          helperText={helperText}
        />
        <InputLabel id="userSelect">Пользователь</InputLabel>
        <Select
          labelId="userSelect"
          id="demo-simple-select"
          value={idToSend}
          label="User"
          onChange={handleSelectChange}
        >
          {userList?.map((elem) => {
            return (
              <MenuItem value={elem.tlgID} key={elem.tlgID}>
                {elem.name}
              </MenuItem>
            );
          })}
        </Select>
        <Button variant="contained" color="success" onClick={handleClick}>
          Отправить
        </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message="User info updated"
      >
        {responseStatus === true ? (
          <Alert severity="success">Сообщение отправлено.</Alert>
        ) : (
          <Alert severity="error">Произошла ошибка</Alert>
        )}
      </Snackbar>
      </Stack>
    </ActionCard>
  );
}
