export interface UserDataResponse {
  exp: number;
  id: string;
  role: IUserRole;
  name: string;
  createdAt: string;
}

export type UserDataSend = {
  exp: number;
  role: IUserRole;
  name: string;
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

export interface ITrashState {
  loading: boolean;
  userState: IUserState;
  tlgId: string;
  exp: number;
  profilePictureBlob: string;
  role: IUserRole;
  name: string;
  createdAt: Date | null;
  userList: IUser[] | null;
  setText(text: string): void;
  setExp(amount: number): void;
  setLoading(state: boolean): void;
  setRole(role: IUserRole): void;
  setUserList(list: any): void;
  setProfilePictureBlob(blobText: string): void;
  fetchCurrentUserData(): void;
  fetchUserData(tlgID: number): Promise<UserDataResponse | null>;
  sendUserData(data:UserDataSend): Promise<number>;
  refreshToken(): void;
  fetchProfilePicture(): void;
  fetchlistOfUsers(): void;
  dispatchAction(actionType: string, payload: any): void;
}
