import styled from '@emotion/styled'
import { BG_COLOR, LIGHT_GRAY } from "../../../constants";

export const UserListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const UserCardWrapper = styled.div`
  margin: 10px 10px;
  background-color: ${LIGHT_GRAY};
`;

export const UserStat = styled.div`
  flex: 50%;
`;

export const UserCardStatsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px 10px;
  background-color: ${LIGHT_GRAY};
`;

export const UserCardHeader = styled.div`
  background-color: ${BG_COLOR};
  color: white;
  font-weight: bold;
  text-align: center;
  font-size: 1.5vh;
  padding: 1vh 0px;
`;
