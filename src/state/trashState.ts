import { makeAutoObservable } from "mobx";
import { $authHost, $host } from "../http";
import {
  IUserState,
  UserRefreshResponse,
  UserTestResponse,
} from "./interfaces";

export interface ITrashState {
  loading: boolean;
  userState: IUserState;
  text: string;
  setText(text: string): void;
  setLoading(state: boolean): void;
  fetchUserData(): void;
  refreshToken(): void;
  dispatchAction(actionType: string, payload: any): void;
}

export class TrashStore implements ITrashState {
  loading: boolean;
  userState: IUserState;
  text: string;

  constructor() {
    this.loading = false;
    this.userState = "LOADING";
    this.text = "";
    makeAutoObservable(this);
  }

  setLoading(state: boolean): void {
    this.loading = state;
  }

  setUserState(state: IUserState): void {
    this.userState = state;
  }

  setText(text: string) {
    this.text = text;
  }

  async fetchUserData() {
    try {
      const res = await $authHost.get<UserTestResponse>("api/user/test");
      this.setText(res.data.text);
      this.setUserState("NORMAL_RESPONSE");
    } catch (error) {
      console.log("error in fetchUserData", error);
      this.setUserState("ERROR");
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
      console.log("changed accessToken");
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
