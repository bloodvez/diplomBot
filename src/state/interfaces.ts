export interface UserDataResponse {
  exp: number;
  id: string;
  role: IUserRole;
  name: string;
}
export interface UserRefreshResponse {
  accessToken: string;
}

export type IUserResponses = UserDataResponse | UserRefreshResponse;

export type IUserState = "LOADING" | "NORMAL_RESPONSE" | "ERROR";
export type IUserRole = "USER" | "ADMIN";