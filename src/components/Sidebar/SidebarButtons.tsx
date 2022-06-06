import { useNavigate } from "react-router-dom";
import { SidebarButton } from "./components";

interface SidebarButtonProp {
    text: string;
  }

export function UserInfoButton(props:SidebarButtonProp) {
  const navigate = useNavigate();
  return (
    <SidebarButton
      onClick={() => {
        navigate("/", { replace: true });
      }}
    >
      {props.text}
    </SidebarButton>
  );
}

export function UserActionsButton(props:SidebarButtonProp) {
  const navigate = useNavigate();
  return (
    <SidebarButton
      onClick={() => {
        navigate("/actions", { replace: true });
      }}
    >
      {props.text}
    </SidebarButton>
  );
}

export function AdminButton(props:SidebarButtonProp) {
  const navigate = useNavigate();
  return (
    <SidebarButton
      onClick={() => {
        navigate("/admin", { replace: true });
      }}
    >
      {props.text}
    </SidebarButton>
  );
}
