import React from "react";
import { IUser } from "../../../state/interfaces";
import { UserCardHeader, UserCardStatsWrapper, UserCardWrapper, UserStat } from "./components";

interface UserCardProp {
  user: IUser;
}

function AdminUserCard(prop: UserCardProp) {
  return (
    <UserCardWrapper>
      <UserCardHeader>{prop.user.name}</UserCardHeader>
      <UserCardStatsWrapper>
        <UserStat>Опыт: {prop.user.exp}</UserStat>
        <UserStat>Role: {prop.user.role}</UserStat>
      </UserCardStatsWrapper>
    </UserCardWrapper>
  );
}

export default AdminUserCard;
