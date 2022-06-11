export type UserDataResponse = {
  exp: number;
  id: string;
  role: IUserRole;
  name: string;
  createdAt: string;
  level:number;
}

export type UserDataSend = {
  exp: number;
  role: IUserRole;
  name: string;
  level: number;
}

export type UserRefreshResponse = {
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
  level: number;
}

export type IUserResponses = UserDataResponse | UserRefreshResponse;

export type IUserState = "LOADING" | "NORMAL_RESPONSE" | "ERROR";
export type IUserRole = "USER" | "ADMIN";

export interface ITrashState {
  loading: boolean;
  userState: IUserState;
  tlgId: string;
  exp: number;
  profilePictureBlob: string;
  role: IUserRole;
  name: string;
  createdAt: Date | null;
  level: number;
  init():void;
  setText(text: string): void;
  setExp(amount: number): void;
  setLoading(state: boolean): void;
  setRole(role: IUserRole): void;
  setUserState(state: IUserState) : void;
  setLevel(level:number):void;
}
