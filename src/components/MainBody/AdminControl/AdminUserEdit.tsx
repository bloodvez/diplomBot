import React from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { TrashContext } from "../../..";
import { IUserRole } from "../../../state/interfaces";
import Sidebar from "../../Sidebar/Sidebar";
import { MainBodyWrapper, MenuHeader } from "../components";

function AdminUserEdit() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const trash = React.useContext(TrashContext);
  const navigate = useNavigate();

  const [name, setName] = React.useState<string>("");
  const [role, setRole] = React.useState<IUserRole>("USER");
  const [exp, setExp] = React.useState<number>(0);

  React.useEffect(() => {
    trash.fetchUserData(parseInt(id)).then((data) => {
      setName(data!.name);
      setRole(data!.role);
      setExp(data!.exp);
    });
  }, [trash, id]);

  const sendData = () => {
    const payload = { name: name, role: role, exp: exp, tlgID: id };
    trash.sendUserData(payload)
    navigate('/admin')
  };
  return (
    <>
      <Sidebar />
      <MainBodyWrapper>
        <MenuHeader>Редактирование пользователя</MenuHeader>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Имя пользователя</Form.Label>
            <Form.Control
              type="text"
              placeholder="Имя пользователя"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Опыт</Form.Label>
            <Form.Control
              type="number"
              placeholder="Опыт"
              value={exp}
              onChange={(e) => {
                setExp(parseInt(e.target.value));
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {role}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    setRole("USER");
                  }}
                >
                  USER
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setRole("ADMIN");
                  }}
                >
                  ADMIN
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          
          <Button onClick={sendData} variant="primary">
            Submit
          </Button>
        </Form>
      </MainBodyWrapper>
    </>
  );
}

export default AdminUserEdit;
