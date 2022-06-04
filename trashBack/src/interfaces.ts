import { Application } from "express";
import { Bot } from "grammy";

export interface ITrashServer {
  expressApp: Application;
  tlgBot: Bot;
  tokensArr: IUserToken[];
  initBot(): void;
}

export interface IUserToken {
  tlgID: number;
  token: String;
}
