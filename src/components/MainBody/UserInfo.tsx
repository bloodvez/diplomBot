import { observer } from "mobx-react-lite";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { TrashContext } from "../..";
import { beautifyDate } from "../../utils";
import Loading from "../Loading/Loading";
import Sidebar from "../Sidebar/Sidebar";
import { MainBodyWrapper } from "./components";
import MenuHeader from "./MenuHeader";

const UserInfo = observer(() => {
  const trash = React.useContext(TrashContext);
  const [timeString, settimeString] = React.useState("");
  const [expLeft, setexpLeft] = React.useState<number>(0);

  React.useEffect(() => {
    trash.init()
    let left = Math.floor(100*Math.pow(trash.level, 1.3)) - trash.exp
    if (left <= 0) {left = 0}
    setexpLeft(left)

    if (trash.createdAt) {
      const timeString = beautifyDate(trash.createdAt);
      settimeString(timeString);
    }
  }, [trash]);

  return (
    <>
      <Sidebar />
      <MainBodyWrapper>
        <MenuHeader text="Информация о пользователе"/>
        {trash.userState === "LOADING" && <Loading />}
        {trash.userState === "NORMAL_RESPONSE" && (
          <>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {`Имя: ${trash.name}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`Опыт: ${trash.exp}. До следующего: ${expLeft}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`Уровень: ${trash.level}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`Зарегистрирован: ${timeString}`}
                </Typography>
              </CardContent>
            </Card>
          </>
        )}
        {trash.userState === "ERROR" && <>{"Error"}</>}
      </MainBodyWrapper>
    </>
  );
});

export default UserInfo;
