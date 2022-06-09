import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TrashContext } from "../../..";
import { IUserRole } from "../../../state/interfaces";
import TextField from "@mui/material/TextField";
import Sidebar from "../../Sidebar/Sidebar";
import { MainBodyWrapper, MenuHeader } from "../components";
import { Button, Select, SelectChangeEvent } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";

function AdminUserEdit() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const trash = React.useContext(TrashContext);
  const navigate = useNavigate();

  const [name, setName] = React.useState<string>("");
  const [role, setRole] = React.useState<IUserRole>("USER");
  const [exp, setExp] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [snackbarOpen, setsnackbarOpen] = React.useState(false);

  React.useEffect(() => {
    trash.fetchUserData(parseInt(id)).then((data) => {
      setName(data!.name);
      setRole(data!.role);
      setExp(data!.exp);
    });
  }, [trash, id]);

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackbarOpen(false);
  };

  const sendData = async () => {
    setLoading(true);
    const payload = { name: name, role: role, exp: exp, tlgID: id };
    const resCode = await trash.sendUserData(payload);
    if (resCode !== 200) {
      return;
    }
    setLoading(false);
    setsnackbarOpen(true);
    // navigate("/admin");
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as IUserRole);
  };
  return (
    <>
      <Sidebar />
      <MainBodyWrapper>
        <MenuHeader>Редактирование пользователя</MenuHeader>
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
            <Button variant="outlined" onClick={sendData}>
              Submit
            </Button>
          )}
        </Stack>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          message="User info updated"
        />
      </MainBodyWrapper>
    </>
  );
}

export default AdminUserEdit;
