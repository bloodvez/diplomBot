import React from "react";
import { IUser } from "../../../state/interfaces";
import {
  UserCardHeader,
  UserCardStatsWrapper,
  UserCardWrapper,
  UserStat,
} from "./components";
import { useNavigate } from "react-router-dom";

interface UserCardProp {
  user: IUser;
}

function AdminUserCard(prop: UserCardProp) {
  const navigate = useNavigate();
  return (
    <UserCardWrapper>
      <UserCardHeader>{prop.user.name}</UserCardHeader>
      <UserCardStatsWrapper>
        <UserStat>Опыт: {prop.user.exp}</UserStat>
        <UserStat>Роль: {prop.user.role}</UserStat>
        <button onClick={() =>{
          navigate(`/admin/${prop.user.tlgID}`)
        }}>Редактировать</button>
      </UserCardStatsWrapper>
    </UserCardWrapper>
  );
}

export default AdminUserCard;
