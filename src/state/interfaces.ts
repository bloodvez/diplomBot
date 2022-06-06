export interface UserDataResponse {
  exp: number;
  id: string;
  role: IUserRole;
  name: string;
  createdAt: string;
}
export interface UserRefreshResponse {
  accessToken: string;
}

export interface IUser {
  createdAt: string;
  exp: number;
  id: number;
  name: string;
  refreshToken: string;
  role: "ADMIN" | "USER";
  tlgID: string;
  updatedAt: string;
}

export type IUserResponses = UserDataResponse | UserRefreshResponse;

export type IUserState = "LOADING" | "NORMAL_RESPONSE" | "ERROR";
export type IUserRole = "USER" | "ADMIN";
