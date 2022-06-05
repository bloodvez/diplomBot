export interface UserTestResponse {
  text: string;
}
export interface UserRefreshResponse {
  accessToken: string;
}

export type IUserResponses = UserTestResponse | UserRefreshResponse;

export type IUserState = "LOADING" | "NORMAL_RESPONSE" | "ERROR";
