import { $authHost, $host } from ".";
import {
  IUser,
  UserDataResponse,
  UserDataSend,
  UserRefreshResponse,
} from "../state/interfaces";

export async function fetchlistOfUsers(): Promise<IUser[] | null> {
  try {
    const { data } = await $authHost.get<IUser[]>("api/user/getUsers");
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function refreshToken(): Promise<string | null> {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken === null) return null;

    const res = await $host.post<UserRefreshResponse>("api/user/refresh", {
      refreshToken: refreshToken,
    });

    if (res.status === 200) return res.data.accessToken;

    return null;
  } catch (error) {
    console.log("error in refreshToken", error);
    return null;
  }
}

export async function fetchUserData(
  tlgID: number
): Promise<UserDataResponse | null> {
  try {
    const res = await $authHost.get<UserDataResponse>(
      `api/user/getUser?id=${tlgID}`
    );
    if (res.status !== 200) return null;
    return res.data;
  } catch (error) {
    console.log("error in fetchUserData", error);
    return null;
  }
}

export async function sendUserData(data: UserDataSend): Promise<number> {
  try {
    const res = await $authHost.post<UserDataResponse>(
      "api/user/postUser",
      data
    );
    if (res.status !== 200) return res.status;

    return res.status;
  } catch (err: any) {
    return 404;
  }
}

export async function fetchProfilePicture(): Promise<string | null> {
  try {
    const res = await $authHost.get("api/user/picture", {
      responseType: "blob",
      timeout: 30000,
    });
    if (res.status !== 200) return null;

    const objectURL = URL.createObjectURL(res.data);
    return objectURL;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchCurrentUserData(): Promise<UserDataResponse | null> {
  try {
    const res = await $authHost.get<UserDataResponse>("api/user/");
    if (res.status !== 200) return null;
    return res.data;
  } catch (error) {
    console.log("error in fetchUserData", error);
    return null;
  }
}

type pingPayload = {
  text: string;
};

type sendMessagePayload = {
  tlgID: string;
  text: string;
};

export interface ISendMessageAction {
  actionType: "SEND_MESSAGE";
  payload: sendMessagePayload;
}

export interface IPingAction {
  actionType: "PING";
  payload: pingPayload;
}

type actionsTypes = ISendMessageAction | IPingAction;

export async function dispatchAction(action: actionsTypes): Promise<boolean> {
  try {
    const res = await $authHost.post("api/user/action", {
      actionType: action.actionType,
      payload: action.payload,
    });
    if(res.status !== 200){
      console.log('not ok');
      return false
    }
    return true
  } catch (error) {
    console.log("error in dispatchAction", error);
    return false
  }
}
