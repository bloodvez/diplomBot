import { makeAutoObservable } from "mobx";
import { $authHost, $host } from "../http";
import {
  IUserRole,
  IUserState,
  UserRefreshResponse,
  UserDataResponse,
} from "./interfaces";

export interface ITrashState {
  loading: boolean;
  userState: IUserState;
  tlgId: string;
  exp: number;
  profilePictureBlob: string;
  role : IUserRole;
  name: string;
  setText(text: string): void;
  setExp(amount: number): void;
  setLoading(state: boolean): void;
  setProfilePictureBlob(blobText: string): void;
  fetchUserData(): void;
  refreshToken(): void;
  fetchProfilePicture(): void;
  dispatchAction(actionType: string, payload: any): void;
}

export class TrashStore implements ITrashState {
  loading: boolean;
  userState: IUserState;
  tlgId: string;
  exp: number;
  profilePictureBlob: string;
  role: IUserRole;
  name: string;

  constructor() {
    this.loading = false;
    this.userState = "LOADING";
    this.tlgId = "";
    this.exp = 0;
    this.profilePictureBlob = "./img/logo.jpg";
    this.role = 'USER'
    this.name = ''
    makeAutoObservable(this);
  }

  setLoading(state: boolean): void {
    this.loading = state;
  }

  setUserState(state: IUserState): void {
    this.userState = state;
  }

  setText(text: string) {
    this.tlgId = text;
  }

  setProfilePictureBlob(blobText: string) {
    this.profilePictureBlob = blobText;
  }

  setExp(amount: number) {
    this.exp = amount;
  }

  setRole(role: IUserRole) {
    this.role = role;
  }

  setName(name:string){
    this.name = name;
  }

  async fetchUserData() {
    try {
      const res = await $authHost.get<UserDataResponse>("api/user/");
      this.setText(res.data.id);
      this.setExp(res.data.exp);
      this.setName(res.data.name)
      this.setRole(res.data.role)
      this.setUserState("NORMAL_RESPONSE");
    } catch (error) {
      console.log("error in fetchUserData", error);
      this.setUserState("ERROR");
    }
  }

  async fetchProfilePicture() {
    try {
      const res = await $authHost.get("api/user/picture", {
        responseType: "blob",
        timeout: 30000,
      });
      let objectURL = URL.createObjectURL(res.data);
      this.setProfilePictureBlob(objectURL)
    } catch (error) {
      console.log(error);
    }
  }

  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken === null) return console.log("no token");

      const res = await $host.post<UserRefreshResponse>("api/user/refresh", {
        refreshToken: refreshToken,
      });

      localStorage.setItem("accessToken", res.data.accessToken);
    } catch (error) {
      console.log("error in refreshToken", error);
      this.setUserState("ERROR");
    }
  }

  async dispatchAction(actionType: string = "sendMsg", payload: Object) {
    try {
      $authHost.post("api/user/action", {
        actionType: actionType,
        payload: payload,
      });
    } catch (error) {
      console.log("error in dispatchAction", error);
    }
  }
}
