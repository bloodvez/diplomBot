import React from "react";
import { ActionCard } from "./ActionCard";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { TrashContext } from "../../..";
import { sendUserData } from "../../../http/methods";

export function ExchangeExperience() {
  const trash = React.useContext(TrashContext);
  const [tooltipTitle, settooltipTitle] = React.useState<string>("");
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(true);
  const [expLeft, setexpLeft] = React.useState<number>(0);

  React.useEffect(() => {
    const expNeeded = Math.floor(100 * Math.pow(trash.level, 1.3));
    setexpLeft(expNeeded - trash.exp);
    if (expLeft <= 0) {
      setButtonDisabled(false);
      settooltipTitle("");
      return;
    }
    setButtonDisabled(true);
    settooltipTitle(`Недостаточно ${expLeft}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const exchange = () => {
    const expNeeded = Math.floor(100 * Math.pow(trash.level, 1.3));
    if (trash.exp >= expNeeded) {
      trash.setExp(trash.exp - expNeeded)
      trash.setLevel(trash.level + 1)
      const payload = { name: trash.name, role: trash.role, exp: trash.exp, tlgID: trash.tlgId, level: trash.level};
      sendUserData(payload)
      // console.log("advence");
      return;
    }
  };

  return (
    <ActionCard commandName="Поменять опыт на уровень">
      <Tooltip title={tooltipTitle} arrow disableInteractive>
        <span>
          <Button
            disabled={buttonDisabled}
            variant="contained"
            color="success"
            onClick={exchange}
          >
            Поменять
          </Button>
        </span>
      </Tooltip>
    </ActionCard>
  );
}
