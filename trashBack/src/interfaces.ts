import { Application, Request } from "express";
import { Bot } from "grammy";

export interface ITrashServer {
  expressApp: Application;
  tlgBot: Bot;
  initBot(): void;
}

export type IUserRole = "USER" | "ADMIN";

export interface trashUser {
  role: IUserRole;
  tlgID: number;
}

export type pingPayload = {
  text: string;
};

export type sendMessagePayload = {
  tlgID: number;
  text: string;
};

export type pingAction = {
  actionType: "PING";
  payload: pingPayload;
};

export type sendMessageAction = {
  actionType: "SEND_MESSAGE";
  payload: sendMessagePayload;
};

export type trashActions = pingAction | sendMessageAction;

export interface TypedRequestBody extends Request {
  user: trashUser;
}

export interface ActionRequestBody extends TypedRequestBody {
  body: trashActions;
}

export interface UserDataResponse {
  id: number;
  exp: number;
  role: IUserRole;
  name: string;
  createdAt: string;
}
