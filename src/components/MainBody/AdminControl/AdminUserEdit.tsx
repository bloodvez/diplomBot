import React from "react";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import { TrashContext } from "../../..";
import { IUserRole } from "../../../state/interfaces";
import Sidebar from "../../Sidebar/Sidebar";
import { MainBodyWrapper } from "../components";
import { Button, Select, SelectChangeEvent } from "@mui/material";
import MenuHeader from "../MenuHeader";
import { WarningBackdrop } from "./WarningBackdrop";
import { fetchUserData, sendUserData } from "../../../http/methods";

type IResponseTypes = "success" | "fail";

function AdminUserEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const trash = React.useContext(TrashContext);

  const [name, setName] = React.useState<string>("");
  const [role, setRole] = React.useState<IUserRole>("USER");
  const [previousRole, setpreviousRole] = React.useState<IUserRole>("USER");
  const [exp, setExp] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [warningOpen, setWarningOpen] = React.useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(false);

  const [responseStatus, setresponseStatus] =
    React.useState<IResponseTypes>("success");

  React.useEffect(() => {
    console.log('fetchin');
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    const data = await fetchUserData(parseInt(id));
    if (!data) return;
    setName(data!.name);
    setRole(data!.role);
    setExp(data!.exp);
    setpreviousRole(data!.role);
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

  const sendData = async () => {
    setLoading(true);
    const payload = { name: name, role: role, exp: exp, tlgID: id };
    const resCode = await sendUserData(payload);
    if (resCode !== 200) {
      setLoading(false);
      setresponseStatus("fail");
      setSnackbarOpen(true);
      return;
    }
    setLoading(false);
    setresponseStatus("success");
    setSnackbarOpen(true);
    if (trash.tlgId === id && previousRole === "ADMIN" && role === "USER") {
      navigate("/");
    }
  };

  const handleSubmit = () => {
    if (trash.tlgId === id && previousRole === "ADMIN" && role === "USER") {
      setWarningOpen(true);
      return;
    }
    sendData();
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as IUserRole);
  };

  const navigateBack = () => {
    navigate("/admin");
  };

  return (
    <>
      <Sidebar />
      <MainBodyWrapper>
        <MenuHeader text="Редактирование пользователя">
          <IconButton color="inherit" onClick={navigateBack}>
            <ArrowBackIcon />
          </IconButton>
        </MenuHeader>
        <Stack spacing={2}>
          <TextField
            required
            label="Имя пользователя"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            required
            label="Опыт"
            value={exp}
            onChange={(e) => {
              setExp(parseInt(e.target.value));
            }}
          />
          <Select value={role} label="Role" onChange={handleSelectChange}>
            <MenuItem value={"USER"}>User</MenuItem>
            <MenuItem value={"ADMIN"}>Admin</MenuItem>
          </Select>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button variant="outlined" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </Stack>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          message="User info updated"
        >
          {responseStatus === "success" ? (
            <Alert severity="success">
              Информация о пользователе изменена.
            </Alert>
          ) : (
            <Alert severity="error">Произошла ошибка</Alert>
          )}
        </Snackbar>
        <WarningBackdrop
          open={warningOpen}
          closeBackdrop={() => {
            setWarningOpen(false);
          }}
          onAccept={sendData}
        />
      </MainBodyWrapper>
    </>
  );
}

export default AdminUserEdit;
